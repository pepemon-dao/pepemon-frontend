const chains = {
	"1": "ETH",
	...(process.env.NODE_ENV !== 'production' && { "4": "RINKEBY" }),
	"56": "BSC",
	"137": "MATIC",
};

export default chains;
