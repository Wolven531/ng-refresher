// run after every single it() block
afterEach(done => {
	// use setTimeout to move pending async code to non-main JS event queue
	setTimeout(() => {
		// tell test runner to finish test execution, failing any pending async assertions / tests
		done()
	}, 0)
})
