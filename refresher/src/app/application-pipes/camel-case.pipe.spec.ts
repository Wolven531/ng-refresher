import { CamelCasePipe } from './camel-case.pipe'

describe('CamelCasePipe', () => {
	// pipe is a pure, stateless function - no need for beforeEach
	const pipe = new CamelCasePipe()

	it('handles empty string', () => {
		expect(pipe.transform('')).toBe('')
	})

	it('handles single word (mixed casing)', () => {
		expect(pipe.transform('AbCd')).toBe('abcd')
	})

	it('handles strings w/ spaces (mixed casing)', () => {
		expect(pipe.transform('hello SWEET wOrLd')).toBe('helloSweetWorld')
	})
})
