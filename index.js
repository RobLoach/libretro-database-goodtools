let datfile = require('robloach-datfile')
let pkg = require('./package.json')
let fs = require('fs')

console.log('GoodTools is disabled for now.')
return

function renderHeader(name, vendor, version = null) {
	if (version === null) {
		version = pkg.version
	}
	return `clrmamepro (
	name "${vendor} - ${name}"
	description "${vendor} - ${name}"
	version "${version}"
	homepage "${pkg.homepage}"
)\n`
}

function cleanName(title) {
	// Ignore any BIOS or boot sector images.
	if (title.includes(" BIOS ") || title.includes(" Boot Sector ")) {
		return ''
	}
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
		.replace('[a5]', '')
		.replace('[a6]', '')
		.replace('[a7]', '')
		.replace('[a8]', '')
		.replace('[a9]', '')
		.replace('[M]', '')
		.replace('[M1]', '')
		.replace('[M2]', '')
		.replace('[M3]', '')
		.replace('[M4]', '')
		.replace('[M5]', '')
		.replace('[M6]', '')
		.replace('[M7]', '')
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
		.replace('[b5]', '')
		.replace('[b6]', '')
		.replace('[b7]', '')
		.replace('[b8]', '')
		.replace('[b9]', '')
		.replace('[b10]', '')
		.replace('[c]', '')
		.replace('[f]', '')
		.replace('[f1]', '')
		.replace('[f2]', '')
		.replace('[f3]', '')
		.replace('[f4]', '')
		.replace('[f5]', '')
		.replace('[f6]', '')
		.replace('[f7]', '')
		.replace('[f8]', '')
		.replace('[h]', '')
		.replace('[h1]', '')
		.replace('[h2]', '')
		.replace('[h3]', '')
		.replace('[h4]', '')
		.replace('[h5]', '')
		.replace('[h6]', '')
		.replace('[h7]', '')
		.replace('[h8]', '')
		.replace('[h9]', '')
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
		.replace('[h0e]', '')
		.replace('[h13]', '')
		.replace('[o]', '')
		.replace('[o1]', '')
		.replace('[o2]', '')
		.replace('[o3]', '')
		.replace('[o4]', '')
		.replace('[o5]', '')
		.replace('[o6]', '')
		.replace('[o7]', '')
		.replace('[o8]', '')
		.replace('[o9]', '')
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
		.replace('[t8]', '')
		.replace('[t9]', '')
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
		.replace('[T-006]', '')
		.replace('[T-007]', '')
		.replace('[T-008]', '')
		.replace('[T-009]', '')
		.replace('[x]', '')
		.replace('[x1]', '')
		.replace('[x2]', '')
		.replace('[x3]', '')
		.replace('[!p]', '')

		// GoodGen
		.replace(' (1)', '')
		.replace(' (2)', '')
		.replace(' (3)', '')
		.replace(' (4)', '')
		.replace(' (5)', '')
		.replace(' (6)', '')
		.replace(' (7)', '')
		.replace(' (8)', '')
		.replace(' (9)', '')

		// GoodSNES
		.replace(' (BS)', '')
		.replace(' (ST)', '')
		.replace(' (NP)', '')
		.replace(' (NSS)', '')

		// Public domain
		.replace(' (PD)', '')
		.replace(' (Unl)', '')

		// Custom tags
		.replace(' [T-Rus]', '')
		.replace(' (Kiosk Demo)', '')
		.replace(' (Atari)', '')
		.replace(' (CC2)', '')
		.replace(' (SGX)', '')
		.replace(' (no SGX)', '')
		.replace(' (Hardware Compatible)', '')
		.replace(' (Z64)', '')
		.replace(' (VC)', ' (Virtual Console)')
		.replace(' (V1.0)', ' (v1.0)')
		.replace(' (V1.1)', ' (v1.1)')
		.replace(' (V1.2)', ' (v1.2)')
		.replace(' (V1.3)', ' (v1.3)')
		.replace(' (V1.4)', ' (v1.4)')
		.replace(' (V1.5)', ' (v1.5)')
		.replace(' (V1.6)', ' (v1.6)')
		.replace(' (V1.7)', ' (v1.7)')
		.replace(' (V1.8)', ' (v1.8)')
		.replace(' (V1.9)', ' (v1.9)')
		.replace(' (V2.0)', ' (v2.0)')
		.replace(' (V2.1)', ' (v2.1)')
		.replace(' (V2.2)', ' (v2.2)')
		.replace(' (V2.3)', ' (v2.3)')
		.replace(' (V2.4)', ' (v2.4)')
		.replace(' (V2.5)', ' (v2.5)')
		.replace(' (V2.6)', ' (v2.6)')
		.replace(' (V2.7)', ' (v2.7)')
		.replace(' (V2.8)', ' (v2.8)')
		.replace(' (V2.9)', ' (v2.9)')
		.replace(' (V3.0)', ' (v3.0)')
		.replace(' (V3.1)', ' (v3.1)')
		.replace(' (V3.2)', ' (v3.2)')
		.replace(' (V3.3)', ' (v3.3)')

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
		.replace(' (JE)', ' (Japan, Europe)')
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
		.replace(' (REV00)', '')
		.replace(' (REV01)', '')
		.replace(' (REV02)', '')
		.replace(' (REV03)', '')
		.replace(' (REV04)', '')
		.replace(' (REV05)', '')
		.replace(' (REV06)', '')
	
		// Whitespace
		.replace('  ', ' ')
		.replace('  ', ' ')
		.replace('  ', ' ')
		.replace('  ', ' ')
		.replace('  ', ' ')

	return output.trim()
}

function renderEntry(game) {
	let name = cleanName(game.name)
	if (name) {
		return `
game (
	name "${name}"
	description "${name}"
	rom ( name "${game.filename}" size ${game.size} crc ${game.crc} md5 ${game.md5} sha1 ${game.sha1} )
)
`
	}
	return ''
}

function writeDat(entries, name, vendor, version) {
	let output = renderHeader(name, vendor, version)
	for (let entry of entries) {
		let rendered = renderEntry(entry)
		if (rendered) {
			output += renderEntry(entry)
		}
	}
	fs.writeFileSync('libretro-database/metadat/goodtools/' + vendor + ' - ' + name + '.dat', output)
}

function standardDatCleaner(inputFile, name, vendor, version) {
	datfile.parseFile(inputFile).then(function (dat) {
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
		writeDat(entries, name, vendor, version)
	}).catch(function(err) {
		console.error(err)
	})
}

standardDatCleaner('libretro-database/metadat/goodtools/Good2600 3.14.dat', '2600', 'Atari', '3.14')
standardDatCleaner('libretro-database/metadat/goodtools/Good5200 2.01.dat', '5200', 'Atari', '2.01')
standardDatCleaner('libretro-database/metadat/goodtools/Good7800 3.28.dat', '7800', 'Atari', '3.28')
standardDatCleaner('libretro-database/metadat/goodtools/GoodJag 2.01.dat', 'Jaguar', 'Atari', '2.01')
standardDatCleaner('libretro-database/metadat/goodtools/GoodLynx 2.01.dat', 'Lynx', 'Atari', '2.01')
standardDatCleaner('libretro-database/metadat/goodtools/GoodCol 3.14.dat', 'ColecoVision', 'Coleco', '3.14')
standardDatCleaner('libretro-database/metadat/goodtools/GoodGG 3.20.dat', 'Game Gear', 'Sega', '3.20')
standardDatCleaner('libretro-database/metadat/goodtools/GoodSMS 3.20.dat', 'Master System - Mark III', 'Sega', '3.20')
standardDatCleaner('libretro-database/metadat/goodtools/GoodPico 3.15.dat', 'PICO', 'Sega', '3.15')
standardDatCleaner('libretro-database/metadat/goodtools/GoodNGPx 3.27.dat', 'Neo Geo Pocket Color', 'SNK', '3.27')
standardDatCleaner('libretro-database/metadat/goodtools/GoodN64 3.27.dat', 'Nintendo 64', 'Nintendo', '3.27')
standardDatCleaner('libretro-database/metadat/goodtools/GoodVBoy 3.1415.dat', 'Virtual Boy', 'Nintendo', '3.1415')
standardDatCleaner('libretro-database/metadat/goodtools/GoodNES 3.23b.dat', 'Nintendo Entertainment System', 'Nintendo', '3.23b')
standardDatCleaner('libretro-database/metadat/goodtools/GoodVect 1.06.dat', 'Vectrex', 'GCE', '1.06')
standardDatCleaner('libretro-database/metadat/goodtools/GoodMSX1 0.999.3.dat', 'MSX', 'Microsoft', '0.999.3')
standardDatCleaner('libretro-database/metadat/goodtools/GoodMSX2 0.999.3.dat', 'MSX2', 'Microsoft', '0.999.3')
standardDatCleaner('libretro-database/metadat/goodtools/GoodGB64 3.00.dat', '64', 'Commodore', '3.00')
standardDatCleaner('libretro-database/metadat/goodtools/GoodSV 3.27.dat', 'Supervision', 'Watara', '3.27')

datfile.parseFile('libretro-database/metadat/goodtools/GoodSNES 3.27.dat').then(function (dat) {
	let snesEntries = []
	let satellaviewEntries = []
	let sufamiEntries = []
	for (let activeEntry of dat) {
		let trueName = activeEntry.name

		if (activeEntry.entries) {
			let entry = activeEntry.entries[0]
			entry.filename = entry.name
			entry.name = trueName
			if (entry.name.includes(' (BS)')) {
				satellaviewEntries.push(entry)
			}
			else if (entry.name.includes(' (ST)')) {
				sufamiEntries.push(entry)
			}
			else {
				snesEntries.push(entry)
			}
		}
	}

	writeDat(snesEntries, 'Super Nintendo Entertainment System', 'Nintendo', '3.27')
	writeDat(satellaviewEntries, 'Satellaview', 'Nintendo', '3.27')
	writeDat(sufamiEntries, 'Sufami Turbo', 'Nintendo', '3.27')
}).catch(function(err) {
	console.error(err)
})

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

	writeDat(wonderswanEntries, 'WonderSwan', 'Bandai', '3.27')
	writeDat(wonderswanColorEntries, 'WonderSwan Color', 'Bandai', '3.27')
}).catch(function(err) {
	console.error(err)
})

datfile.parseFile('libretro-database/metadat/goodtools/GoodPCE 1.09a.dat').then(function (dat) {
	let turbografxEntries = []
	let turbografxSuperGrafxEntries = []
	for (let activeEntry of dat) {
		let trueName = activeEntry.name

		if (activeEntry.entries) {
			let entry = activeEntry.entries[0]
			entry.filename = entry.name
			entry.name = trueName
			if (entry.filename.includes('(SGX)')) {
				turbografxSuperGrafxEntries.push(entry)
			}
			else {
				turbografxEntries.push(entry)
			}
		}
	}

	writeDat(turbografxEntries, 'PC Engine - TurboGrafx 16', 'NEC', '1.09a')
	writeDat(turbografxSuperGrafxEntries, 'PC Engine SuperGrafx', 'NEC', '1.09a')
}).catch(function(err) {
	console.error(err)
})


datfile.parseFile('libretro-database/metadat/goodtools/GoodGen 3.21.dat').then(function (dat) {
	let genEntries = []
	let gen32xEntries = []
	for (let activeEntry of dat) {
		let trueName = activeEntry.name

		if (activeEntry.entries) {
			let entry = activeEntry.entries[0]
			entry.filename = entry.name
			entry.name = trueName
			if (entry.filename.includes('.32x')) {
				gen32xEntries.push(entry)
			}
			else {
				genEntries.push(entry)
			}
		}
	}

	writeDat(gen32xEntries, '32X', 'Sega', '3.21')
	writeDat(genEntries, 'Mega Drive - Genesis', 'Sega', '3.21')
}).catch(function(err) {
	console.error(err)
})
