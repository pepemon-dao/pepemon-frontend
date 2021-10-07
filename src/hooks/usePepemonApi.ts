import {useEffect, useState} from 'react';
import usePepemon from './usePepemon';

const usePepemonApi = (endpoint: string) => {
    const [response, setResponse] = useState<any>(null);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const { provider } = usePepemon();

    const fetchData = async (endpoint: string) => {
        setIsFetching(true)
        const { chainId } = await provider.getNetwork();
        const host = parseInt(chainId) === 1 ? `https://pepemon.finance/api` : `https://dev.pepemon.finance/api`;
        const response = await fetch(
            `${host}${endpoint}`,
            { method: 'GET'},
        );
        if (!response.ok) {
            setIsFetching(false);
            return null;
        }
        setIsFetching( false);
        return response.json();
    }

    useEffect(() => {
        // @ts-ignore
        if (!networkId || networkId === 0) {
            return;
        }
        fetchData(endpoint).then(res => setResponse(res)).catch(err => console.error(err));
    }, [provider, endpoint])

    return { response, isFetching };
}

export default usePepemonApi;
