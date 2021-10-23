// STORE CONSTANTS
type SeriesType = {
	title: string,
	title_formatted: string,
	cards: number[],
}

// ETH SERIES
const ORIGIN_SERIES: SeriesType = {
	title: 'Origin Series',
	title_formatted: 'ORIGIN_SERIES',
	cards: [1, 2, 3, 4, 5, 6, 7, 8],
}

const CHARACTER_SERIES_CARDS: SeriesType = {
	title: 'Character Series',
	title_formatted: 'CHARACTER_SERIES_CARDS',
	cards: [9, 10, 11, 12],
}

const FRIENDS_SERIES_CARDS: SeriesType = {
	title: 'Buddy Series',
	title_formatted: 'FRIENDS_SERIES_CARDS',
	cards: [13, 14, 15, 16],
}

const EVENT_ITEM_CARDS: SeriesType = {
	title: 'Event Items',
	title_formatted: 'EVENT_ITEM_CARDS',
	cards: process.env.NODE_ENV === 'test' ? [17] : [17, 18, 19],
}

const NEW_BEGINNING_CARDS: SeriesType = {
	title: 'New Beginning Series',
	title_formatted: 'NEW_BEGINNING_CARDS',
	cards: [25, 26, 27, 28, 29, 30, 47, 62, 63, 64],
}

const DUNGEONS_AND_DRAGONS: SeriesType = {
	title: 'Dungeons & Dragons Series',
	title_formatted: 'DUNGEONS_AND_DRAGONS',
	cards: [38, 39, 40, 41, 42, 43],
}

const NEW_BEGINNING_PIXEL_CARDS: SeriesType = {
	title: 'New Beginning Pixel Series',
	title_formatted: 'NEW_BEGINNING_PIXEL_CARDS',
	cards: [54, 53, 52, 51, 58, 68],
}

// MATIC SERIES
const MATIC_SERIES: SeriesType = {
	title: 'Matic Test Series',
	title_formatted: 'MATIC_SERIES',
	cards: [1, 2],
}

// BSC SERIES
const CARTOONIZED_SERIES: SeriesType = {
	title: 'Cartoonized Series',
	title_formatted: 'CARTOONIZED_SERIES',
	cards: [3, 4, 5, 6, 7, 8, 10, 11, 12],
}

// PepemonOneAnniversarySet
export const PPMNONE_ANNIVERSARY_SET = {
	cards: [75, 76, 77, 78],
}

// All cards ID's
export const ALL_CARDS = [...ORIGIN_SERIES.cards, ...CHARACTER_SERIES_CARDS.cards, ...FRIENDS_SERIES_CARDS.cards, ...NEW_BEGINNING_CARDS.cards, ...DUNGEONS_AND_DRAGONS.cards, ...NEW_BEGINNING_PIXEL_CARDS.cards, ...PPMNONE_ANNIVERSARY_SET.cards];


// series per chainId
const ALL_SERIES = new Map([
	[1, process.env.NODE_ENV === 'test' ? [EVENT_ITEM_CARDS] : [EVENT_ITEM_CARDS, NEW_BEGINNING_PIXEL_CARDS, NEW_BEGINNING_CARDS, DUNGEONS_AND_DRAGONS, FRIENDS_SERIES_CARDS, CHARACTER_SERIES_CARDS, ORIGIN_SERIES]],
	[4, process.env.NODE_ENV === 'test' ? [EVENT_ITEM_CARDS, NEW_BEGINNING_CARDS, DUNGEONS_AND_DRAGONS] : [EVENT_ITEM_CARDS, NEW_BEGINNING_CARDS, DUNGEONS_AND_DRAGONS, FRIENDS_SERIES_CARDS, CHARACTER_SERIES_CARDS, ORIGIN_SERIES]],
	[56, [CARTOONIZED_SERIES]],
	[137, [MATIC_SERIES]],
]);

export default ALL_SERIES;
