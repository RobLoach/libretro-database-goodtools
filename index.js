let datfile = require('robloach-datfile')
let pkg = require('./package.json')
let fs = require('fs')

function renderHeader(name, vendor) {
	return `clrmamepro (
	name "${vendor} - ${name}"
	description "${vendor} - ${name}"
	version "${pkg.version}"
	homepage "${pkg.homepage}"
)\n`
}

function cleanName(title) {
	let output = title.trim()

	// Remove GoodTools flags
	// https://segaretro.org/GoodTools
	output = output
		.replace('[!]', '')
		.replace('[C]', '')
		.replace('[a]', '')
		.replace('[a1]', '')
		.replace('[a2]', '')
		.replace('[a3]', '')
		.replace('[a4]', '')
		.replace('[M]', '')
		.replace('[M1]', '')
		.replace('[M2]', '')
		.replace('[M3]', '')
		.replace('[M4]', '')
		.replace('[M5]', '')
		.replace('(M)', '')
		.replace('(M1)', '')
		.replace('(M2)', '')
		.replace('(M3)', '')
		.replace('(M4)', '')
		.replace('(M5)', '')
		.replace('(PAL-NTSC)', '')
		.replace('(NTSC)', '')
		.replace('(PAL)', '')
		.replace('[b]', '')
		.replace('[b1]', '')
		.replace('[b2]', '')
		.replace('[b3]', '')
		.replace('[b4]', '')
		.replace('[c]', '')
		.replace('[f]', '')
		.replace('[f1]', '')
		.replace('[f2]', '')
		.replace('[f3]', '')
		.replace('[f4]', '')
		.replace('[f5]', '')
		.replace('[h]', '')
		.replace('[h1]', '')
		.replace('[h2]', '')
		.replace('[h3]', '')
		.replace('[h4]', '')
		.replace('[h5]', '')
		.replace('[h6]', '')
		.replace('[h1C]', '')
		.replace('[h2C]', '')
		.replace('[h3C]', '')
		.replace('[h4C]', '')
		.replace('[h5C]', '')
		.replace('[h6C]', '')
		.replace('[h7C]', '')
		.replace('[h8C]', '')
		.replace('[h9C]', '')
		.replace('[h10C]', '')
		.replace('[o]', '')
		.replace('[o1]', '')
		.replace('[o2]', '')
		.replace('[o3]', '')
		.replace('[o4]', '')
		.replace('[o5]', '')
		.replace('(Prototype)', '')
		.replace('[p]', '')
		.replace('[p1]', '')
		.replace('[p2]', '')
		.replace('[p3]', '')
		.replace('[p4]', '')
		.replace('[p5]', '')
		.replace('[p6]', '')
		.replace('[p7]', '')
		.replace('[p8]', '')
		.replace('[p9]', '')
		.replace('(PRG1)', '')
		.replace('[t]', '')
		.replace('[t1]', '')
		.replace('[t2]', '')
		.replace('[t3]', '')
		.replace('[t4]', '')
		.replace('[t5]', '')
		.replace('[t6]', '')
		.replace('[t7]', '')
		.replace('[T+XXX]', '')
		.replace('[T-XXX]', '')
		.replace('[T+001]', '')
		.replace('[T+002]', '')
		.replace('[T+003]', '')
		.replace('[T+004]', '')
		.replace('[T+005]', '')
		.replace('[T-001]', '')
		.replace('[T-002]', '')
		.replace('[T-003]', '')
		.replace('[T-004]', '')
		.replace('[T-005]', '')
		.replace('[x]', '')
		.replace('[!p]', '')

		// GoodGen
		.replace(' (1)', '')
		.replace(' (4)', '')
		.replace(' (5)', '')
		.replace(' (8)', '')
		.replace(' (1)', '')
		.replace(' (1)', '')
		.replace(' (1)', '')
		.replace(' (1)', '')

		// Public domain
		.replace(' (PD)', '')
		.replace(' (Unl)', '')

		// Custom tags
		.replace(' [T-Rus]', '')
		.replace(' (Kiosk Demo)', '')

		// Country codes
		.replace(' (E)', ' (Europe)')
		.replace(' (J)', ' (Japan)')
		.replace(' (U)', ' (USA)')
		.replace(' (W)', ' (World)')
		.replace(' (A)', ' (Australia)')
		.replace(' (B)', ' (Japan)')
		.replace(' (C)', ' (China)')
		.replace(' (D)', ' (Dutch)')
		.replace(' (F)', ' (France)')
		.replace(' (FC)', ' (Canada)')
		.replace(' (FN)', ' (Finland)')
		.replace(' (G)', ' (Germany)')
		.replace(' (GR)', ' (Greece)')
		.replace(' (HK)', ' (Hong Kong)')
		.replace(' (I)', ' (Italy)')
		.replace(' (K)', ' (Korea)')
		.replace(' (NL)', ' (Netherlands)')
		.replace(' (S)', ' (Spain)')
		.replace(' (Sw)', ' (Sweden)')
		.replace(' (UK)', ' (United Kingdom)')
		.replace(' (JU)', ' (Japan, USA)')
		.replace(' (UE)', ' (USA, Europe)')
		.replace(' (JUE)', ' (Japan, USA, Europe)')
		.replace(' (Unk)', '')
		.replace(' (DS-1)', '')
		.replace(' (DS-2)', '')
		.replace(' (DS-3)', '')
		.replace(' (DS-4)', '')
		.replace(' (-)', '')
		.replace(' (Mn)', '')
		.replace(' (J-Cart)', '')
		.replace(' (MP)', '')
		.replace(' (REVSC01)', '')
		.replace(' (REVSC02)', '')
		.replace(' (REVSC03)', '')
		.replace(' (REVSC04)', '')

	return output.trim()
}

function renderEntry(game) {
	let name = cleanName(game.name)
	return `
game (
	name "${name}"
	description "${name}"
	rom ( name "${game.filename}" size ${game.size} crc ${game.crc} md5 ${game.md5} sha1 ${game.sha1} )
)
`
}

function writeDat(entries, name, vendor) {
	let output = renderHeader(name, vendor)
	for (let entry of entries) {
		output += renderEntry(entry)
	}
	fs.writeFileSync('libretro-database/metadat/goodtools/' + vendor + ' - ' + name + '.dat', output)
}

datfile.parseFile('libretro-database/metadat/goodtools/GoodWSx 3.27.dat').then(function (dat) {
	let wonderswanEntries = []
	let wonderswanColorEntries = []
	for (let activeEntry of dat) {
		let trueName = activeEntry.name

		if (activeEntry.entries) {
			let entry = activeEntry.entries[0]
			entry.filename = entry.name
			entry.name = trueName
			if (entry.filename.includes('.wsc')) {
				wonderswanColorEntries.push(entry)
			}
			else {
				wonderswanEntries.push(entry)
			}
		}
	}

	writeDat(wonderswanEntries, 'WonderSwan', 'Bandai')
	writeDat(wonderswanColorEntries, 'WonderSwan Color', 'Bandai')
}).catch(function(err) {
	console.error(err)
})

datfile.parseFile('libretro-database/metadat/goodtools/GoodN64 3.27.dat').then(function (dat) {
	let entries = []
	for (let activeEntry of dat) {
		let trueName = activeEntry.name

		if (activeEntry.entries) {
			let entry = activeEntry.entries[0]
			entry.filename = entry.name
			entry.name = trueName
			entries.push(entry)
		}
	}
	writeDat(entries, 'Nintendo 64', 'Nintendo')
})