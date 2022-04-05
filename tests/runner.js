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

// The test runner!!!
export class TestRunner {
	constructor(elem) {
		// It outputs to a <ul> element.
		this.listElem = elem;
		
		this.stat = new TestStat();
	}
	
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
	
	runTest(test) {
		let passed;
		
		// Create "running" message
		let n = this.putMessage(
			`Running <em>"${test.name}"</em>...\n` +
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
		
		// Add the text.
		point.innerHTML = `Test <em>"${test.name}"</em> passed! <weak>(${test.location})</weak>`;
		if (info !== "") point.textContent += `\n${info}`;
		
		// Add it to the end of the list!
		return this.listElem.appendChild(point);
	}
	
	failedMessage(test, error) {
		// Create a bullet point.
		let point = document.createElement("li");
		
		// Style it.
		point.classList.add("testResult");
		point.classList.add("testResultFailure");
		
		let stackTrace = error.stack
			.split('\n') // Do a bad hack to remove...
			.map(i => i.startsWith('@') ? i.substring(1) : i) // useless @s
			.filter(i => !i.includes("tests/util.js")) // utility functions
			.filter(i => !i.includes("tests/runner.js")) // test runner fns
			.filter(i => !i.includes(".html"))         // any inline script
			.join('\n'); // ...from stack trace.
		
		// Add the text.
		point.innerHTML = `Test <em>"${test.name}"</em> failed...`;
		point.textContent += `\n${error}`;
		point.textContent += `\nStack trace:\n${stackTrace}`;
		
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
