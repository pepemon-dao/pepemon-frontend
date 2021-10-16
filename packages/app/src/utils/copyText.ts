const useCopyText = async (text: string|number) => {
	if (typeof text === 'number') { text = text.toString(); }
	try {
		await navigator.clipboard.writeText(text);
	} catch (err) {
		console.error('Failed to copy: ', err);
	}
}

export default useCopyText;
