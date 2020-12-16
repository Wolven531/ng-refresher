import { CapitalizePipe } from './capitalize.pipe'

describe('CapitalizePipe', () => {
	// pipe is a pure, stateless function - no need for beforeEach
	const pipe = new CapitalizePipe()

	it('handles empty string', () => {
		expect(pipe.transform('')).toBe('')
	})

	it('handles single word (all lowercase)', () => {
		expect(pipe.transform('abc')).toBe('Abc')
	})

	it('handles single word (mixed casing)', () => {
		expect(pipe.transform('aBcD')).toBe('Abcd')
	})

	it('handles strings w/ spaces (all lowercase)', () => {
		expect(pipe.transform('abc def')).toBe('Abc def')
	})
})
