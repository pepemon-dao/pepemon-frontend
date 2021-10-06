import { pastry, cerbery, primariny, unifairy, witchenry, fudizard, pepertle, pepechu, pepesaur, pepemander,
		boosterpackGen13, boosterpackSupport3, boosterpackMonsters3, boosterpackGen16, boosterpackSupport6, boosterpackMonsters6, boosterpackGen19, boosterpackSupport9, boosterpackMonsters9
		} from '../assets';

export const pokeCards = {
	newPixelSeries: {
		title: "New pixel beginning series",
		cards: {
			"pastry": { name: "Pastry", url: pastry, minted: "10/20", time: "20 hours", price: "75" },
			"cerbery": { name: "Cerbery", url: cerbery, minted: "10/20", time: "6 days", price: "75" },
			"primariny": { name: "Primariny", url: primariny, minted: "10/20", time: "6 days", price: "75" },
			"unifairy": { name: "Unifairy", url: unifairy, minted: "10/20", time: "6 days", price: "75" },
			"witchenry": { name: "Witchenry", url: witchenry, minted: "10/20", time: "6 days", price: "75" },
			"fudizard": { name: "Fudizard", url: fudizard, minted: "10/20", time: "6 days", price: "75" }
		}
	},
	originalSeries: {
		title: "Origin Series",
		cards: {
			"pepechu": { name: "Pepechu", url: pepechu, minted: "20/20", time: "sold out", price: "75" },
			"pepertle": { name: "Pepertle", url: pepertle, minted: "10/20", time: "sold out", price: "75" },
			"pepesaur": { name: "Pepesaur", url: pepesaur, minted: "10/20", time: "sold out", price: "75" },
			"pepemander": { name: "Pepemander", url: pepemander, minted: "10/20", time: "sold out", price: "75" }
		}
	}
};

export const pokePacks = {
	battleMonstersEdition: {
		title: "Battle Monsters edition",
		cards: {
			"pastry": { name: "Battle Monsters edition - 3 cards", cardsPerPack: 3, url: boosterpackMonsters3, minted: "10/20", time: "20 hours", price: "75" },
			"cerbery": { name: "Battle Monsters edition - 6 cards", cardsPerPack: 6, url: boosterpackMonsters6, minted: "10/20", time: "20 hours", price: "175" },
			"primariny": { name: "Battle Monsters edition - 9 cards", cardsPerPack: 9, url: boosterpackMonsters9, minted: "10/20", time: "20 hours", pric1000: "75" },
		}
	},
	gen1Edition: {
		title: "Gen 1 edition",
		cards: {
			"pepechu": { name: "Gen 1 edition - 3 cards", cardsPerPack: 3, url: boosterpackGen13, minted: "10/20", time: "20 hours", price: "75" },
			"pepertle": { name: "Gen 1 edition - 6 cards", cardsPerPack: 6, url: boosterpackGen16, minted: "10/20", time: "20 hours", price: "175" },
			"pepesaur": { name: "Gen 1 edition - 9 cards", cardsPerPack: 9, url: boosterpackGen19, minted: "10/20", time: "20 hours", price: "1000" },
		}
	},
	battleSupportEdition: {
		title: "Battle Support edition",
		cards: {
			"pepechu": { name: "Battle Support edition - 3 cards", cardsPerPack: 3, url: boosterpackSupport3, minted: "10/20", time: "20 hours", price: "75" },
			"pepertle": { name: "Battle Support edition - 6 cards", cardsPerPack: 6, url: boosterpackSupport6, minted: "10/20", time: "20 hours", price: "175" },
			"pepesaur": { name: "Battle Support edition - 9 cards", cardsPerPack: 9, url: boosterpackSupport9, minted: "10/20", time: "20 hours", price: "1000" },
		}
	}
};
