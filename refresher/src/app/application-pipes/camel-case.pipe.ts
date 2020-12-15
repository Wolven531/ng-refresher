import { Pipe, PipeTransform } from '@angular/core'

/**
 * Convert a string or phrase to camel case (remove sapces, capitalize every word after first)
 *
 * Usage:
 *    value | camel-case
 *
 * Example:
 *    {{ 'hello SWEET wOrLd' | camel-case }} // formats to 'helloSweetWorld'
*/
@Pipe({ name: 'camel-case' })
export class CamelCasePipe implements PipeTransform {
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

				const restOfString = word.substr(1)

				if (ind === 0) {
					const firstAfterLower = word[0].toLowerCase()

					return `${firstAfterLower}${restOfString}`
				}

				const firstAfterCap = word[0].toUpperCase()

				return `${firstAfterCap}${restOfString}`
			})
			.join('')
	}
}
