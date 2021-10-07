
export const getBalanceOfBatch = async (
    contract: any,
    userAddress: string,
    tokenIds: number[],
): Promise<any[]> => {
    try {
        const result = await contract.balanceOfBatch(tokenIds.map(() => userAddress), tokenIds)
        return result;
    } catch (e) {
        console.error(e);
        return null as any;
    }
}

export const getTotalSupply = async (
    contract: any,
    tokenId: number,
): Promise<any> => {
    try {
        return await contract.totalSupply(tokenId)
    } catch (e) {
        console.error(e);
        return null;
    }
}

export const getMaxSupply = async (
    contract: any,
    tokenId: number,
): Promise<any> => {
    try {
        return await contract.maxSupply(tokenId)
    } catch (e) {
        console.error(e);
        return null;
    }
}

