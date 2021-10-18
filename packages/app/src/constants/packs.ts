import { Boosterpack_3_cards_Battle_Monsters, Boosterpack_3_cards_Battle_Support, Boosterpack_3_cards_Gen_1, Boosterpack_6_cards_Battle_Monsters, Boosterpack_6_cards_Battle_Support, Boosterpack_6_cards_Gen_1, Boosterpack_9_cards_Battle_Monsters, Boosterpack_9_cards_Battle_Support, Boosterpack_9_cards_Gen_1 } from '../assets';

const BATTLE_MONSTERS_EDITION = {
	title: 'Battle Monsters edition',
	title_formatted: 'BATTLE_MONSTERS_EDITION',
	cards: {
		"pastry": { name: "Battle Monsters edition - 3 cards", cardsPerPack: 3, url: Boosterpack_3_cards_Battle_Monsters, minted: "10/20", time: "20 hours", price: "75" },
		"cerbery": { name: "Battle Monsters edition - 6 cards", cardsPerPack: 6, url: Boosterpack_6_cards_Battle_Monsters, minted: "10/20", time: "20 hours", price: "175" },
		"primariny": { name: "Battle Monsters edition - 9 cards", cardsPerPack: 9, url: Boosterpack_9_cards_Battle_Monsters, minted: "10/20", time: "20 hours", price: "1000" },
	}
}

const GEN_1_EDITION = {
	title: 'Gen 1 edition',
	title_formatted: 'GEN_1_EDITION',
	cards: {
		"pepechu": { name: "Gen 1 edition - 3 cards", cardsPerPack: 3, url: Boosterpack_3_cards_Gen_1, minted: "10/20", time: "20 hours", price: "75" },
		"pepertle": { name: "Gen 1 edition - 6 cards", cardsPerPack: 6, url: Boosterpack_6_cards_Gen_1, minted: "10/20", time: "20 hours", price: "175" },
		"pepesaur": { name: "Gen 1 edition - 9 cards", cardsPerPack: 9, url: Boosterpack_9_cards_Gen_1, minted: "10/20", time: "20 hours", price: "1000" },
	}
}
const BATTLE_SUPPORT_EDITION = {
	title: 'Battle Support edition',
	title_formatted: 'BATTLE_SUPPORT_EDITION',
	cards: {
		"pepechu": { name: "Battle Support edition - 3 cards", cardsPerPack: 3, url: Boosterpack_3_cards_Battle_Support, minted: "10/20", time: "20 hours", price: "75" },
		"pepertle": { name: "Battle Support edition - 6 cards", cardsPerPack: 6, url: Boosterpack_6_cards_Battle_Support, minted: "10/20", time: "20 hours", price: "175" },
		"pepesaur": { name: "Battle Support edition - 9 cards", cardsPerPack: 9, url: Boosterpack_9_cards_Battle_Support, minted: "10/20", time: "20 hours", price: "1000" },
	}
}


// series per chainId
const ALL_BOOSTERPACKS = new Map([
	[1, [BATTLE_MONSTERS_EDITION, GEN_1_EDITION, BATTLE_SUPPORT_EDITION]],
	[4, [BATTLE_MONSTERS_EDITION, GEN_1_EDITION, BATTLE_SUPPORT_EDITION]],
	[56, [BATTLE_MONSTERS_EDITION, GEN_1_EDITION, BATTLE_SUPPORT_EDITION]],
	[137, [BATTLE_MONSTERS_EDITION, GEN_1_EDITION, BATTLE_SUPPORT_EDITION]]
]);

export default ALL_BOOSTERPACKS;
