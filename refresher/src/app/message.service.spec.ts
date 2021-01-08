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

	describe('invoke add()', () => {
		const fakeMsg = 'msg 1'

		beforeEach(() => {
			service.add(fakeMsg)
		})

		it('adds message to collection', () => {
			expect(service.messages).toEqual([fakeMsg])
		})

		describe('invoke clearAll()', () => {
			beforeEach(() => {
				service.clearAll()
			})

			it('clears all messages from collection', () => {
				expect(service.messages).toEqual([])
			})
		})
	})
})
