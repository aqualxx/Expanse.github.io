const SIZES = {
	m: 1,
	km: 1e3,
	Mm: 1e6,
	Gm: 1e9,
	Tm: 1e12,
	Pm: 1e15,
	ly: 9.461e15,
	pc: 3.086e16,
	kpc: 3.086e19,
	Mpc: 3.086e22,
	Gpc: 3.086e25,
	uni: 4.4e26
};

const dmupprices = [
	"2000",
	"5000",
	"20000",
	"1e6",
	"1e6",
	"3500",
	"500000"
]

const STARTINGPLAYER = function () {
	return {
		options: {
			newsHidden: false,
			theme: "Light"
		},
		expanse: {
			expanses: new Decimal("0"),
			size: new Decimal("0"),
			best: new Decimal("0"),
			upgrades: [
				{bought: 0},
				{bought: 0},
				{bought: 0},
				{bought: 0}
			]
		},
		darkmatter: {
			unlocked: false,
			amount: new Decimal("0"),
			best: new Decimal("0"),
			ups: [],
			upsunlocked: false
		},
		quarks: {
			unlocked: false,
			amount: new Decimal("0"),
			gravity: new Decimal("0"),
			energy: new Decimal("0"),
			milestones: [],
			ups: [],
			mile4on: true,
			auto: {
				unlocked: false,
				active: true,
				gravityTick: 5000
			}
		},
		achievements: [],
		time: Date.now(),
		updateHTMLtime: 50
	}
}

const ACH_DATA = {
	"11": {
		title: "A little baby universe!",
		desc: "Reach 75m³ of space."
	},
	"12": {
		title: "10/10 great product",
		desc: "Gain at least 5 dark matter in total."
	},
	"13": {
		title: "haha funny number",
		desc: "Have more than 69.69 dark matter.",
		reward: "Greatly improve the dark matter formula."
	},	
	"14": {
		title: "A not so baby universe!",
		desc: "Gain 50m³ of space each second"
	},
	"15": {
		title: "Upgrades Galore",
		desc: "Unlock dark matter upgrades."
	},
	"16": {
		title: "Lost the light switch",
		desc: "Gain 1 million dark matter in one run."
	},
	"17": {
		title: "I love grinding!",
		desc: "Complete the requirements and preform a quark reset.",
		reward: "Gain 3x more dark matter."
	},
	"18": {
		title: "Light bulb incremental confirmed?!?!",
		desc: "Reach 10000 energy.",
		reward: "Gravity has less of an effect."
	},
	"21": {
		title: "But it's only quarks!",
		desc: "Have 150000 gravity at one time or another"
	},
	"22": {
		title: "haha space go brrr",
		desc: "Buy 3 or more quark upgrades."
	},
	"23": {
		title: "How is this expanding?",
		desc: "Reach 5 Mm³ of space without any dark matter",
		reward: "Dark matter gain is multiplied by 5."
	},
	"24": {
		title: "Hey, guys, soup's ready!",
		desc: "Reach 2000 quarks",
		reward: "The energy effect is slightly boosted"
	},
	"25": {},
	"26": {},
	"27": {},
	"28": {}
}

const FORMULAS = {
	dmup3boost: function () {
		return player.darkmatter.ups[2] ? player.darkmatter.amount.max(1).log(4).max(1).toFixed(2).toString() : "1"
	},
	dmup5boost: function () {
		return player.darkmatter.ups[4] ? player.quarks.amount.max(1).log10().max(1).toFixed(2).toString() : "1"
	}
}
