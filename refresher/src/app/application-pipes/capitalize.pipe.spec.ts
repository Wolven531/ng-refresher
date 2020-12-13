import { CapitalizePipe } from './capitalize.pipe'

describe('CapitalizePipe', () => {
	// pipe is a pure, stateless function - no need for beforeEach
	const pipe = new CapitalizePipe()

	it('handles single word (all lowercase)', () => {
		expect(pipe.transform('abc')).toBe('Abc')
	})

	it('handles strings w/ spaces (all lowercase)', () => {
		expect(pipe.transform('abc def')).toBe('Abc def')
	})
})
