import { Pipe, PipeTransform } from '@angular/core'

/**
 * Make the first letter of a string capital, and the rest of it lowercase
 *
 * Usage:
 *    value | capitalize
 *
 * Example:
 *    {{ 'hElLo' | capitalize }} // formats to 'Hello'
*/
@Pipe({ name: 'capitalize' })
export class CapitalizePipe implements PipeTransform {
	transform(value: string): string {
		value = (value || '').trim()

		if (value.length < 1) {
			return value
		}

		const firstCapitalized = value[0].toUpperCase()
		const restOfStringLower = value.substr(1).toLowerCase()

		return `${firstCapitalized}${restOfStringLower}`
	}
}
