import {useEffect, useState} from 'react';


const useTotalValueStaked = () => {
    const [totalValueStaked, setTotalValueStaked] = useState<any>({})

    const fetchUniV2PpblzStakedValue = async () => {
        const response = await fetch(
            'https://api.ethplorer.io/getAddressInfo/0x9479b62FD1CB36F8FEd1EEBb1Bb373d238d08216?apiKey=EK-rbHn9-RbvTYb7-GWodE',
            { method: 'GET'} ,
        );
        const addressInfo = await response.json();
        const uniV2Pool = addressInfo.tokens.reduce((accumulator: any, current: any) => {
            if (current.tokenInfo.symbol === 'WETH') {
                return {
                    ...accumulator,
                    wethBalance: current.balance / (10 ** 18),
                    wethPrice: current.tokenInfo.price.rate,
                }
            }

            return {
                ...accumulator,
                ppblzBalance: current.balance / (10 ** 18),
            }
        }, { wethBalance: 0, wethPrice: 0, ppblzBalance: 0 })
        const ppblzPrice = (uniV2Pool.wethBalance * uniV2Pool.wethPrice) / uniV2Pool.ppblzBalance;

        return {
            ...uniV2Pool,
            ppblzPrice,
            tvl: (ppblzPrice * uniV2Pool.ppblzBalance) + (uniV2Pool.wethPrice * uniV2Pool.wethBalance)
        }
    }

    const fetchPpblzStakedValue = async () => {
        const response = await fetch(
            'https://api.ethplorer.io/getAddressInfo/0xf1F508c7C9f0d1b15a76fbA564eEf2d956220cf7?apiKey=EK-rbHn9-RbvTYb7-GWodE',
            { method: 'GET'},
        );
        const addressInfo = await response.json();
        return { ppblzBalance: addressInfo.tokens.find((token: any) => token.tokenInfo.symbol === 'PPBLZ').balance / (10 ** 18) };
    };

    const fetchPpdexPrice = async () => {
        const response = await fetch(
            'https://api.ethplorer.io/getAddressInfo/0xf1F508c7C9f0d1b15a76fbA564eEf2d956220cf7?apiKey=EK-rbHn9-RbvTYb7-GWodE',
            { method: 'GET'},
        );
        const addressInfo = await response.json();
        return { ppblzBalance: addressInfo.tokens.find((token: any) => token.tokenInfo.symbol === 'PPBLZ').balance / (10 ** 18) };
    };

    useEffect(() => {
        Promise.all([fetchUniV2PpblzStakedValue(), fetchPpblzStakedValue()])
        .then(([uniV2Pool, ppblzPool]) => {
            setTotalValueStaked({
                uniV2Pool,
                ppblzPool: {
                    ...ppblzPool,
                    ppblzPrice: uniV2Pool.ppblzPrice,
                    tvl: ppblzPool.ppblzBalance * uniV2Pool.ppblzPrice,
                }});
        })
    }, [])

    return totalValueStaked;
}

export default useTotalValueStaked;
