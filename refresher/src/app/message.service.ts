import { Injectable } from '@angular/core'

@Injectable({
	providedIn: 'root',
})
export class MessageService {
	messages: string[]

	constructor() {
		this.messages = []
	}

	add(newMessage: string): void {
		this.messages.push(newMessage)
	}

	clearAll(): void {
		this.messages = []
	}
}
