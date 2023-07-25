import {useEffect, useState,useMemo} from 'react';
import usePepemon from './usePepemon';

export interface CardTrait {
	trait_type: string,
	value: string,
}
export interface CardMetadata {
	tokenId: number,
	pool: any,
	external_url: string,
	image: string,
	name: string,
	description: string,
	attributes: CardTrait[],
}

export const useCardsMetadata = (tokenIds: number[]) => {
	const [cards, setCards] = useState<any[]>([]);
	const apiUri = useMemo(
		() =>
		  new Map([
			[1, `https://pepemon.finance/api/cards/`],
			[4, `https://dev.pepemon.finance/api/testCards/`],
			[56, `https://dev.pepemon.finance/api/cards/bsc/`],
			[137, `https://pepemon.finance/api/cards/matic/`],
		  ]),
		[]
	  );
	
	const pepemon = usePepemon();

	useEffect(() => {
		const fetchCardInfo = async (tokenId: number) => {
		  const { chainId } = await pepemon.provider.getNetwork();
		  const response = await fetch(`${apiUri.get(chainId)}${tokenId}`, {
			method: 'GET',
		  });
		  if (!response.ok) {
			return { tokenId, status: 'failed' };
		  }
		  return { tokenId, ...await response.json() };
		}
	  
		Promise.all(tokenIds.map((tokenId) => fetchCardInfo(tokenId)))
		  .then((responses) => {
			setCards(responses.filter(response => response.status !== 'failed'));
		  });
	  }, [tokenIds, pepemon.provider, apiUri]);
	  

	return cards;
}

export const getCardMeta = async (tokenId: number, pepemon: any) => {
	const apiUri = new Map([
	  [1, `https://pepemon.finance/api/cards/`],
	  [4, `https://dev.pepemon.finance/api/testCards/`],
	  [56, `https://dev.pepemon.finance/api/cards/bsc/`],
	  [137, `https://pepemon.finance/api/cards/matic/`],
	]);
  
	const fetchCardInfo = async (tokenId: number) => {
	  const { chainId } = await pepemon.provider.getNetwork();
	  const response = await fetch(`${apiUri.get(chainId)}${tokenId}`, {
		method: 'GET',
	  });
	  if (!response.ok) {
		return { tokenId, status: 'failed' };
	  }
	  const data = await response.json();
	  return { tokenId, ...data };
	};
  
	return await fetchCardInfo(tokenId);
  };
  
  

export default useCardsMetadata;
