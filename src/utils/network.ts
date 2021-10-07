
export const correctChainIsLoaded = async (pepemon: any) => {
    const { chainId } = await pepemon.provider.getNetwork();
    return pepemon.chainId === parseInt(chainId);
}
