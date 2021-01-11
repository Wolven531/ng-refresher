import { HttpClient, HttpClientModule } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'
import { of, Subscription } from 'rxjs'
import { HeroService } from './hero.service'
import { Hero } from './hero/hero.interface'
import { MessageService } from './message.service'

describe('HeroService', () => {
	let mockNet: HttpClient
	let service: HeroService
	let mockMessageService: MessageService

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
		mockMessageService = TestBed.inject(MessageService)
		mockNet = TestBed.inject(HttpClient)
	})

	it('creates service', () => {
		expect(service).toBeTruthy()
	})

	describe('invoke getHeroes()', () => {
		let subGetHeroes: Subscription
		let spyGet: jasmine.Spy

		beforeEach((done) => {
			spyGet = spyOn(mockNet, 'get').and.returnValue(of([
				{ id: 1, name: 'heroone', } as Hero,
			]))

			subGetHeroes = service.getHeroes().subscribe(done)
		})

		afterEach(() => {
			(mockMessageService.add as jasmine.Spy).calls.reset()
			subGetHeroes.unsubscribe()
		})

		it('invokes HttpClient.get() properly', () => {
			expect(spyGet).toHaveBeenCalledTimes(1)
			// private member property, use string accessor to avoid cast to any
			expect(spyGet).toHaveBeenCalledWith(HeroService['ENDPOINT_HEROES'])

			expect(mockMessageService.add).toHaveBeenCalledTimes(1)
			// private member property, use string accessor to avoid cast to any
			expect(mockMessageService.add).toHaveBeenCalledWith(`[ HeroService ] ${HeroService['MSG_HEROES_FETCHED']}`)
		})
	})
})
