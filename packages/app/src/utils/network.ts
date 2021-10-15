
export const correctChainIsLoaded = async (pepemon: any) => {
    if (!pepemon || !pepemon.provider) {
        return false;
    }

    const { chainId } = await pepemon.provider.getNetwork();
    return pepemon.chainId === parseInt(chainId);
}
