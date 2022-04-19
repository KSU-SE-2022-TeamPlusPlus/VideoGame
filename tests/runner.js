// Helper class for holding how many tests passed/failed.
class TestStat {
	constructor() {
		this.total = 0;
		this.passed = 0;
		this.failed = 0;
	}
	
	bool(x) { if (x) this.pass(); else this.fail(); }
	pass() { this.total++; this.passed++; }
	fail() { this.total++; this.failed++; }
	
	combine(other) {
		this.total += other.total;
		this.passed += other.passed;
		this.failed += other.failed;
	}
}

// Helper function for extremely basic HTML sanitization.
function sanitizeBadly(thing) {
	return thing
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;");
}

// Question: Why is the longest function in the test runner
// a function that makes stack traces look nice?
// Answer: Sorry!
function formatStackTrace(errorObject) {
	let stackTrace = errorObject.stack;
	
	if (stackTrace.includes('@')) {
		// Firefox-style stack traces.
		
		// assert@http://localhost:8000/tests/util.js:2:20
		// @http://localhost:8000/tests/testSounds.js:42:9
		// runTest@http://localhost:8000/tests/runner.js:126:15
		// runTests@http://localhost:8000/tests/runner.js:102:22
		// @http://localhost:8000/tests/:73:17
		
		// Let's filter out garbage from stack traces.
		return stackTrace.split('\n')
		// Also note this is all one really long line.
		// I just split it in a bizarre way to improve readability.
		
		// First we should really trim all these elements.
		.map(i => i.trim())
		
		//⬇ @ signs at the start of locations
		.map(i => i.startsWith('@') ? i.substring(1) : i)
		
		//⬇ Functions from either the test runner or its utility functions
		.filter(i => !i.includes("tests/util.js"))
		.filter(i => !i.includes("tests/runner.js"))
		
		//⬇ Long lists of folders at the start of locations
		.map(i => i.substring(i.indexOf("/", i.indexOf("//") + 2)))
		
		//⬇ Inline/anonymous scripts
		.filter(i => !i.includes(".html"))
		.filter(i => !i.includes("/:"))
		
		//⬇ Empty strings
		.filter(i => i.length > 0)
		
		// Finally join the lines back together, adding indentation too!
		.join('\n\t');
		
		// Why aren't stack traces standardized?
		// Maybe if they were, they wouldn't be strings.
	} else if (stackTrace.includes(errorObject.message)) {
		// Chrome-style stack traces.
		
		// Error: assertion failed
		//     at assert (util.js:2:20)
		//     at Object.body (testSounds.js:42:3)
		//     at TestRunner.runTest (runner.js:126:15)
		//     at TestRunner.runTests (runner.js:102:22)
		//     at HTMLDocument.<anonymous> ((index):73:17)
		
		// (yes, indented with four spaces.)
		// (yes, the error message is... there too.)
		
		// Remove redundant error message and associated information.
		let actualStart = stackTrace.indexOf(errorObject.message) + errorObject.message.length + 1;
		stackTrace = stackTrace.substring(actualStart);
		
		return stackTrace.split('\n')
		// Also note this is all one really long line.
		// I just split it in a bizarre way to improve readability.
		
		// First we should really trim all these elements.
		.map(i => i.trim())
		
		//⬇ Functions from either the test runner or its utility functions
		.filter(i => !i.includes("tests/util.js"))
		.filter(i => !i.includes("tests/runner.js"))
		
		//⬇ Inline/anonymous scripts
		.filter(i => !i.includes("<anonymous>"))
		
		//⬇ Long lists of folders at the start of locations
		.map(i => i.substring(i.indexOf("/", i.indexOf("//") + 2)))
		
		//⬇ That darn closing parenthesis
		.map(i => i.substring(0, i.length - 1))
		
		.join('\n\t')
	}
	
	return stackTrace;
}

// The test runner!!!
export class TestRunner {
	constructor(elem) {
		// It outputs to a <ul> element.
		this.listElem = elem;
		
		this.stat = new TestStat();
	}
	
	// Run all tests in a group.
	runTests(testGroup, groupName = "test group") {
		// Show test group name
		let n = this.putMessage(`Running <em>"${groupName}"</em> test group...`);
		
		// Create a new stat tracker for this test group
		let setStat = new TestStat();
		
		// Run all the tests in the group!
		for (const TEST of testGroup) {
			let passed = this.runTest(TEST);
			setStat.bool(passed);
		}
		
		// n.remove();
		
		// Show how many tests passed/failed
		this.finalMessage(setStat);
	}
	
	// Run a single test. Should be passed a test object, which consists of
	// a name and a body. (And a location, but that's secret!!)
	runTest(test) {
		let passed;
		
		// Create "running" message
		let n = this.putMessage(
			`Running <em>"${sanitizeBadly(test.name)}"</em>...\n` +
			`(If you see this, you're probably in an infinite loop.)`
		);
		
		// Run test and catch error if it fails!
		let res, err;
		try {
			res = test.body();
			passed = true;
		} catch (_err) {
			err = _err;
			passed = false;
		}
		
		// Display respective messages for passing/failing.
		if (passed) {
			this.passedMessage(test, res);
			this.stat.pass();
		} else {
			this.failedMessage(test, err);
			this.stat.fail();
		}
		
		// Remove "running" message
		n.remove();
		
		return passed;
	}
	
	putMessage(message) {
		// Create a bullet point.
		let point = document.createElement("li");
		
		// Fill out the text.
		point.innerHTML = message;
		
		// Add it to the end of the list!
		return this.listElem.appendChild(point);
	}
	
	passedMessage(test, info = "") {
		// Create a bullet point.
		let point = document.createElement("li");
		
		// Style it.
		point.classList.add("testResult");
		point.classList.add("testResultSuccess");
		
		let locationLink = "./" + test.location.replace(/:(\d+)/, "#$1");
		
		// Add the text.
		point.innerHTML =
			`Test <em>"${sanitizeBadly(test.name)}"</em> passed! ` +
			`<weak>(<a href="${locationLink}">${test.location}</a>)</weak>`;
		if (info !== "") point.innerHTML += `\n${sanitizeBadly(info)}`;
		
		// Add it to the end of the list!
		return this.listElem.appendChild(point);
	}
	
	failedMessage(test, error) {
		// Create a bullet point.
		let point = document.createElement("li");
		
		// Style it.
		point.classList.add("testResult");
		point.classList.add("testResultFailure");
		
		// Remove garbage from stack trace.
		let stackTrace = formatStackTrace(error);
		
		// Add the text.
		point.innerHTML =
			`Test <em>"${sanitizeBadly(test.name)}"</em> failed...\n` +
			`${sanitizeBadly(error.name)}:\n` +
			`\t${sanitizeBadly(error.message)}\n` +
			`Stack trace:\n\t${sanitizeBadly(stackTrace)}`;
		
		// Add it to the end of the list!
		return this.listElem.appendChild(point);
	}
	
	finalMessage(statObj = this.stat) {
		return this.putMessage(
		`Of <strong class="testTotal">${statObj.total} tests</strong>, ` +
		`<strong class="testTotalPass">${statObj.passed} passed</strong>, ` +
		`and <strong class="testTotalFail">${statObj.failed} failed</strong>.`
		);
	}
}
