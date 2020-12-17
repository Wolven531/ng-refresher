import { CapitalizePipe } from './capitalize.pipe'

describe('CapitalizePipe', () => {
	// pipe is a pure, stateless function - no need for beforeEach
	const pipe = new CapitalizePipe()

	it('handles empty string', () => {
		expect(pipe.transform('')).toBe('')
	})

	it('handles single word (mixed casing)', () => {
		expect(pipe.transform('aBcDe')).toBe('Abcde')
	})

	it('handles strings w/ spaces (mixed casing)', () => {
		expect(pipe.transform('aBc DeF')).toBe('Abc def')
	})
})
