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

	describe('invoke addHero()', () => {
		const fakeHero: Hero = { id: 1, name: 'heroone' }
		let subAddHero: Subscription
		let spyPost: jasmine.Spy

		beforeEach((done) => {
			spyPost = spyOn(mockNet, 'post').and.returnValue(of(fakeHero))

			subAddHero = service.addHero(fakeHero).subscribe(done)
		})

		afterEach(() => {
			(mockMessageService.add as jasmine.Spy).calls.reset()
			subAddHero.unsubscribe()
		})

		it('invokes HttpClient.post() properly', () => {
			expect(spyPost).toHaveBeenCalledTimes(1)
			// private member property, use string accessor to avoid cast to any
			expect(spyPost).toHaveBeenCalledWith(
				HeroService['ENDPOINT_HEROES'],
				fakeHero,
				service['httpOptions'],
			)

			expect(mockMessageService.add).toHaveBeenCalledTimes(1)
			// private member property, use string accessor to avoid cast to any
			expect(mockMessageService.add).toHaveBeenCalledWith(`[ HeroService ] ${HeroService['MSG_HERO_ADDED']} w/ id=${fakeHero.id}`)
		})
	})

	describe('invoke updateHero()', () => {
		const fakeHero: Hero = { id: 1, name: 'heroone' }
		let subUpdateHero: Subscription
		let spyPut: jasmine.Spy

		beforeEach((done) => {
			spyPut = spyOn(mockNet, 'put').and.returnValue(of(fakeHero))

			subUpdateHero = service.updateHero(fakeHero).subscribe(done)
		})

		afterEach(() => {
			(mockMessageService.add as jasmine.Spy).calls.reset()
			subUpdateHero.unsubscribe()
		})

		it('invokes HttpClient.put() properly', () => {
			expect(spyPut).toHaveBeenCalledTimes(1)
			// private member property, use string accessor to avoid cast to any
			expect(spyPut).toHaveBeenCalledWith(
				HeroService['ENDPOINT_HEROES'],
				fakeHero,
				service['httpOptions'],
			)

			expect(mockMessageService.add).toHaveBeenCalledTimes(1)
			// private member property, use string accessor to avoid cast to any
			expect(mockMessageService.add).toHaveBeenCalledWith(`[ HeroService ] ${HeroService['MSG_HERO_UPDATED']} id=${fakeHero.id}`)
		})
	})

	describe('invoke getHero()', () => {
		const fakeId = 1
		let subGetHero: Subscription
		let spyGet: jasmine.Spy

		beforeEach((done) => {
			spyGet = spyOn(mockNet, 'get').and.returnValue(of(
				{ id: fakeId, name: 'heroone', } as Hero,
			))

			subGetHero = service.getHero(1).subscribe(done)
		})

		afterEach(() => {
			(mockMessageService.add as jasmine.Spy).calls.reset()
			subGetHero.unsubscribe()
		})

		it('invokes HttpClient.get() properly', () => {
			expect(spyGet).toHaveBeenCalledTimes(1)
			// private member property, use string accessor to avoid cast to any
			expect(spyGet).toHaveBeenCalledWith(`${HeroService['ENDPOINT_HEROES']}/${fakeId}`)

			expect(mockMessageService.add).toHaveBeenCalledTimes(1)
			// private member property, use string accessor to avoid cast to any
			expect(mockMessageService.add).toHaveBeenCalledWith(`[ HeroService ] ${HeroService['MSG_HERO_FETCHED']}, id=${fakeId}`)
		})
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
