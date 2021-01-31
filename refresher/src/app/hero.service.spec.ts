import { HttpClient } from '@angular/common/http'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { of, Subscription } from 'rxjs'
import { HeroService } from './hero.service'
import { Hero } from './hero/hero.interface'
import { MessageService } from './message.service'

describe('HeroService', () => {
	const FAKE_HERO: Hero = { id: 1, name: 'heroone' }

	let messageService: MessageService
	let mockNet: HttpClient
	let service: HeroService

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				HttpClientTestingModule,
			],
			providers: [],
		}).compileComponents()

		// inject service to test
		service = TestBed.inject(HeroService)

		// inject service dependencies
		messageService = TestBed.inject(MessageService)
		mockNet = TestBed.inject(HttpClient)

		// set up mocks / spies on dependencies
		spyOn(messageService, 'add').and.callFake(jasmine.createSpy())
	})

	it('creates service', () => {
		expect(service).toBeTruthy()
	})

	describe('invoke addHero()', () => {
		let subAddHero: Subscription
		let spyPost: jasmine.Spy

		beforeEach(() => {
			spyPost = spyOn(mockNet, 'post').and.returnValue(of(FAKE_HERO))

			subAddHero = service.addHero(FAKE_HERO).subscribe()
		})

		afterEach(() => {
			subAddHero.unsubscribe()
		})

		it('invokes HttpClient.post() properly', () => {
			expect(spyPost).toHaveBeenCalledTimes(1)
			// private member property, use string accessor to avoid cast to any
			expect(spyPost).toHaveBeenCalledWith(
				HeroService['ENDPOINT_HEROES'],
				FAKE_HERO,
				service['httpOptions'],
			)

			expect(messageService.add).toHaveBeenCalledTimes(1)
			// private member property, use string accessor to avoid cast to any
			expect(messageService.add).toHaveBeenCalledWith(`[ HeroService ] ${HeroService['MSG_HERO_ADDED']} w/ id=${FAKE_HERO.id}`)
		})
	})

	describe('invoke deleteHero()', () => {
		let subDeleteHero: Subscription

		beforeEach(() => {
			// spyOn(mockNet, 'delete') // err - TypeError: Cannot read property 'pipe' of undefined
			// spyOn(mockNet, 'delete').and.resolveTo() // err - TypeError: this.net.delete(...).pipe is not a function
			// spyOn(mockNet, 'delete').and.callFake(jasmine.createSpy()) // TBD
			// spyOn(mockNet, 'delete').and.callFake((url, options) => of('')) // TBD
			spyOn(mockNet, 'delete').and.returnValue(of()) //  works

			subDeleteHero = service.deleteHero(FAKE_HERO.id).subscribe()
		})

		afterEach(() => {
			subDeleteHero.unsubscribe()
		})

		it('invokes HttpClient.delete() properly', () => {
			expect(mockNet.delete).toHaveBeenCalledTimes(1)
			expect(mockNet.delete).toHaveBeenCalledWith(
				// private member property, use string accessor to avoid cast to any
				`${HeroService['ENDPOINT_HEROES']}/${FAKE_HERO.id}`,
				service['httpOptions'],
			)

			// TODO - re-enable beow assertions once working
			// expect(messageService.add).toHaveBeenCalledTimes(1)
			// private member property, use string accessor to avoid cast to any
			// expect(messageService.add).toHaveBeenCalledWith(`[ HeroService ] ${HeroService['MSG_HERO_DELETED']}, id=${fakeHero.id}`)
		})
	})

	describe('invoke getHero()', () => {
		let subGetHero: Subscription
		let spyGet: jasmine.Spy

		beforeEach(() => {
			spyGet = spyOn(mockNet, 'get').and.returnValue(of(FAKE_HERO))

			subGetHero = service.getHero(1).subscribe()
		})

		afterEach(() => {
			subGetHero.unsubscribe()
		})

		it('invokes HttpClient.get() properly', () => {
			expect(spyGet).toHaveBeenCalledTimes(1)
			// private member property, use string accessor to avoid cast to any
			expect(spyGet).toHaveBeenCalledWith(`${HeroService['ENDPOINT_HEROES']}/${FAKE_HERO.id}`)

			expect(messageService.add).toHaveBeenCalledTimes(1)
			// private member property, use string accessor to avoid cast to any
			expect(messageService.add).toHaveBeenCalledWith(`[ HeroService ] ${HeroService['MSG_HERO_FETCHED']}, id=${FAKE_HERO.id}`)
		})
	})

	describe('invoke getHeroes()', () => {
		let subGetHeroes: Subscription
		let spyGet: jasmine.Spy

		beforeEach(() => {
			spyGet = spyOn(mockNet, 'get').and.returnValue(of([FAKE_HERO]))

			subGetHeroes = service.getHeroes().subscribe()
		})

		afterEach(() => {
			subGetHeroes.unsubscribe()
		})

		it('invokes HttpClient.get() properly', () => {
			expect(spyGet).toHaveBeenCalledTimes(1)
			// private member property, use string accessor to avoid cast to any
			expect(spyGet).toHaveBeenCalledWith(HeroService['ENDPOINT_HEROES'])

			expect(messageService.add).toHaveBeenCalledTimes(1)
			// private member property, use string accessor to avoid cast to any
			expect(messageService.add).toHaveBeenCalledWith(`[ HeroService ] ${HeroService['MSG_HEROES_FETCHED']}`)
		})
	})

	describe('invoke updateHero()', () => {
		let subUpdateHero: Subscription
		let spyPut: jasmine.Spy

		beforeEach((done) => {
			spyPut = spyOn(mockNet, 'put').and.returnValue(of(FAKE_HERO))

			subUpdateHero = service.updateHero(FAKE_HERO).subscribe(done)
		})

		afterEach(() => {
			subUpdateHero.unsubscribe()
		})

		it('invokes HttpClient.put() properly', () => {
			expect(spyPut).toHaveBeenCalledTimes(1)
			// private member property, use string accessor to avoid cast to any
			expect(spyPut).toHaveBeenCalledWith(
				HeroService['ENDPOINT_HEROES'],
				FAKE_HERO,
				service['httpOptions'],
			)

			expect(messageService.add).toHaveBeenCalledTimes(1)
			// private member property, use string accessor to avoid cast to any
			expect(messageService.add).toHaveBeenCalledWith(`[ HeroService ] ${HeroService['MSG_HERO_UPDATED']} id=${FAKE_HERO.id}`)
		})
	})
})
