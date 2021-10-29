const isSupportedChain = (chainId: number, pathname: string) => {
	if (pathname.startsWith('/store') || pathname === '/') {
		return (chainId === 1 || chainId === 4 || chainId === 56);
	}
	return (chainId === 1 || chainId === 4);
}

export default isSupportedChain;
