import { TestBed } from '@angular/core/testing'
import { MessageService } from './message.service'

describe('MessageService', () => {
	let service: MessageService

	beforeEach(() => {
		TestBed.configureTestingModule({})
		service = TestBed.inject(MessageService)
	})

	it('creates service w/ messages initialized', () => {
		expect(service).toBeTruthy()
		expect(service.messages).toBeInstanceOf(Array)
		expect(service.messages).toHaveSize(0)
	})
})
