import { Pipe, PipeTransform } from '@angular/core'
import { CapitalizePipe } from './capitalize.pipe'

/**
 * Convert a string or phrase to camel case (remove sapces, capitalize every word after first). Uses CapitalizePipe
 *
 * Usage:
 *    value | camel-case
 *
 * Example:
 *    {{ 'hello SWEET wOrLd' | camel-case }} // formats to 'helloSweetWorld'
*/
@Pipe({ name: 'camel-case' })
export class CamelCasePipe implements PipeTransform {
	private pipe: CapitalizePipe

	constructor() {
		this.pipe = new CapitalizePipe()
	}

	transform(value: string): string {
		value = value || ''

		if (value.length < 1) {
			return value
		}

		return value.split(' ')
			.map((word, ind) => {
				if (word.length < 1) {
					return word
				}

				if (ind === 0) {
					return word.toLowerCase()
				}

				return this.pipe.transform(word)
			})
			.join('')
	}
}
