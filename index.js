let datfile = require('robloach-datfile')
let pkg = require('./package.json')
let fs = require('fs')

function renderHeader(name = 'WonderSwan', vendor = 'Bandai') {
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
	// http://emulation.gametechwiki.com/index.php/GoodTools
	output = output.replace('[!]', '')
		.replace('[a]', '')
		.replace('[C]', '')
		.replace('[a1]', '')
		.replace('[a2]', '')
		.replace('[a3]', '')
		.replace('[a4]', '')
		.replace('[M]', '')
		.replace('[M1]', '')
		.replace('[M2]', '')
		.replace('[b]', '')
		.replace('[b1]', '')
		.replace('[b2]', '')
		.replace('[b3]', '')
		.replace('[b4]', '')
		.replace('[f]', '')
		.replace('[f1]', '')
		.replace('[f2]', '')
		.replace('[f3]', '')
		.replace('[h]', '')
		.replace('[o]', '')
		.replace('[o1]', '')
		.replace('[o2]', '')
		.replace('[o3]', '')
		.replace('[p]', '')
		.replace('[t]', '')
		.replace('[!p]', '')

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

function writeDat(entries, name) {
	let output = renderHeader(name)
	for (let entry of entries) {
		output += renderEntry(entry)
	}
	fs.writeFileSync('libretro-database/metadat/goodtools/Bandai - ' + name + '.dat', output)
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

	writeDat(wonderswanEntries, 'WonderSwan')
	writeDat(wonderswanColorEntries, 'WonderSwan Color')
}).catch(function(err) {
	console.error(err)
})