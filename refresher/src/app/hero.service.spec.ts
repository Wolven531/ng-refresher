import { HttpClient, HttpClientModule } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'
import { of } from 'rxjs'
import { HeroService } from './hero.service'
import { MessageService } from './message.service'

describe('HeroService', () => {
	let mockNet: HttpClient
	let service: HeroService

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				// TODO - replace w/ Http test module
				HttpClientModule,
			],
			providers: [
				{
					provide: MessageService,
					useValue: {
						add: jasmine.createSpy(),
					},
				},
			],
		})

		service = TestBed.inject(HeroService)
		mockNet = TestBed.inject(HttpClient)
	})

	it('creates service', () => {
		expect(service).toBeTruthy()
	})

	describe('invoke getHeroes()', () => {
		let spyGet: jasmine.Spy

		beforeEach(() => {
			spyGet = spyOn(mockNet, 'get').and.returnValue(of([]))

			service.getHeroes()
		})

		it('invokes HttpClient.get() properly', () => {
			expect(spyGet).toHaveBeenCalledTimes(1)
			// private member property, use string accessor to avoid cast to any
			expect(spyGet).toHaveBeenCalledWith(HeroService['ENDPOINT_HEROES'])
		})
	})
})
