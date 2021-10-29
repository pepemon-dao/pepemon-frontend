import {useEffect, useState} from 'react';
import {correctChainIsLoaded} from '../utils/network';
import usePepemon from './usePepemon';

const part1start = '0x0000000000000000000000000000000000000000'
const part2start = '0x45a69256fd9DB26A38361BfF0bDe662Fc0C84093'
const part3start = '0x8a52055CFa76BEF08A71124f2E97E0Aff0657dE3'
const part4start = '0xa891CB0e55C0D848317788D116Ffc992D3FE879c'

const useAccountMerkle = (account: string) => {
    const [response, setResponse] = useState<any>(null);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const pepemon = usePepemon();
    // @ts-ignore
    const selectPart = (account: string) => {
        if (account >= part4start) {
            return 4;
        }
        if (account >= part3start) {
            return 3;
        }
        if (account >= part2start) {
            return 2;
        }
        if (account >= part1start) {
            return 1;
        }
    }
    const fetchData = async (part: number, account: string) => {
        setIsFetching(true)
        const endpoint = `https://raw.githubusercontent.com/ritaritaritarita/bscdrop/main/split${part}.json`
        const response = await fetch(
            `${endpoint}`,
            { method: 'GET'},
        );

        if (!response.ok) {
            setIsFetching(false);
            return null;
        }

        const json = await response.json();
        const merkle = json[account];
        setIsFetching( false);
        return merkle;
    }

    useEffect(() => {
        correctChainIsLoaded(pepemon).then((correct) => {
            if (correct) {
                if (!account) {
                    return;
                }
                const part = selectPart(account);
                fetchData(part, account).then(res => setResponse(res)).catch(err => console.error(err));
            }
        })
    }, [account, pepemon])

    return { response, isFetching };
}

export default useAccountMerkle;
