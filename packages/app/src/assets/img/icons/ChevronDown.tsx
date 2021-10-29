import React from 'react';

const ChevronDown : React.FC<{className?: string, strokeWidth?: number}> = ({className, strokeWidth}) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth ? strokeWidth : 5} d="M19 9l-7 7-7-7" />
		</svg>
	)
}

export default ChevronDown;
