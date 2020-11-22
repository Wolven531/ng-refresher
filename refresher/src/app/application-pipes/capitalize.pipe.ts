import { Pipe, PipeTransform } from '@angular/core'

/**
 * Make the first letter of a string capital
 *
 * Usage:
 *    value | capitalize
 *
 * Example:
 *    {{ 'hello' | capitalize }} // formats to 'Hello'
*/
@Pipe({ name: 'capitalize' })
export class CapitalizePipe implements PipeTransform {
	transform(value: string): string {
		value = value || ''

		if (value.length < 1) {
			return value
		}

		const firstAfterCap = value[0].toUpperCase()
		const restOfString = value.substr(1)

		return `${firstAfterCap}${restOfString}`
	}
}
