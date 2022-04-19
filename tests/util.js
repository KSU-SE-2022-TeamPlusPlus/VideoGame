function assert(thing, message = "assertion failed") {
	if (!thing) throw new Error(message);
}
function areEqual(left, right, message = "assertion failed") {
	if (left !== right) {
		throw new Error(message + `\n\tleft:  ${left}\n\tright: ${right}`);
	}
}
function areNotEqual(left, right, message = "assertion failed") {
	if (left === right) {
		throw new Error(message + `\n\tleft:  ${left}\n\tright: ${right}`);
	}
}

const TEST_GROUPS = [];

// Secret function that tells you where your caller is.
function probe(skip = 2, showFullPath = false) {
	let location;
	try {
		// Throw an error to get the stack frame. (Clever hack!!!)
		// https://stackoverflow.com/a/3806596/
		throw new Error();
	} catch (e) {
		// Skip the first x entries, as they're probably probe itself and the
		// person who called probe. If you know about probe, you're probably
		// not wanting to inspect where you yourself are!!
		// ...But if you do, you can always set skip to 1.
		
		let splitStack = e.stack.split('\n');
		
		// Dirty hack. Increment skip if you're on Chrome.
		if (splitStack[1].trimStart().startsWith("at ")) skip++;
		
		// Anyway, yeah -- we only need one entry from this whole thing.
		location = splitStack[skip];
		
		if (showFullPath) // just erase the @, since it'll be anonymous.
			location = location.substring(location.indexOf('@') + 1);
		else // Erase the entire path, leaving just the filename.
			location = location.substring(location.lastIndexOf('/') + 1);
		
		// Erase the column number, because **nobody** uses that.
		// Unless you're minifying your tests?!!!
		location = location.substring(0, location.lastIndexOf(':'));
	}
	return location;
}

// Pretty code
function test(name, body) {
	return { name, body, location: probe(2) };
}
function testGroup(name, ...tests) {
	TEST_GROUPS.push({ name, tests, location: probe(2) });
}
