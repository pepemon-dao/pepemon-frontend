import React from 'react';

const Check : React.FC<{className?: string, strokeWidth?: number}> = ({className, strokeWidth}) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
		  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth ? strokeWidth : 5} d="M5 13l4 4L19 7" />
		</svg>
	)
}

export default Check;
