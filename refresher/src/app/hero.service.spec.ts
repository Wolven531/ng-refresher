import { HttpClient, HttpClientModule } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'
import { of, Subscription } from 'rxjs'
import { HeroService } from './hero.service'
import { Hero } from './hero/hero.interface'
import { MessageService } from './message.service'

describe('HeroService', () => {
	let messageService: MessageService
	let mockNet: HttpClient
	let service: HeroService

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				HttpClientModule,
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
		const fakeHero: Hero = { id: 1, name: 'heroone' }
		let subAddHero: Subscription
		let spyPost: jasmine.Spy

		beforeEach(() => {
			spyPost = spyOn(mockNet, 'post').and.returnValue(of(fakeHero))

			subAddHero = service.addHero(fakeHero).subscribe()
		})

		afterEach(() => {
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

			expect(messageService.add).toHaveBeenCalledTimes(1)
			// private member property, use string accessor to avoid cast to any
			expect(messageService.add).toHaveBeenCalledWith(`[ HeroService ] ${HeroService['MSG_HERO_ADDED']} w/ id=${fakeHero.id}`)
		})
	})

	xdescribe('invoke deleteHero()', () => {
		const fakeHero: Hero = { id: 1, name: 'heroone' }
		let subDeleteHero: Subscription
		let spyDelete: jasmine.Spy

		beforeEach(() => {
			spyDelete = spyOn(mockNet, 'delete').and.returnValue(of())

			subDeleteHero = service.deleteHero(fakeHero.id).subscribe()
		})

		afterEach(() => {
			subDeleteHero.unsubscribe()
		})

		it('invokes HttpClient.delete() properly', () => {
			expect(spyDelete).toHaveBeenCalledTimes(1)
			// private member property, use string accessor to avoid cast to any
			expect(spyDelete).toHaveBeenCalledWith(
				`${HeroService['ENDPOINT_HEROES']}/${fakeHero.id}`,
				service['httpOptions'],
			)

			expect(messageService.add).toHaveBeenCalledTimes(1)
			// private member property, use string accessor to avoid cast to any
			expect(messageService.add).toHaveBeenCalledWith(`[ HeroService ] ${HeroService['MSG_HERO_DELETED']}, id=${fakeHero.id}`)
		})
	})

	xdescribe('invoke getHero()', () => {
		const fakeId = 1
		let subGetHero: Subscription
		let spyGet: jasmine.Spy

		beforeEach(() => {
			spyGet = spyOn(mockNet, 'get').and.returnValue(of(
				{ id: fakeId, name: 'heroone', } as Hero,
			))

			subGetHero = service.getHero(1).subscribe()
		})

		afterEach(() => {
			subGetHero.unsubscribe()
		})

		it('invokes HttpClient.get() properly', () => {
			expect(spyGet).toHaveBeenCalledTimes(1)
			// private member property, use string accessor to avoid cast to any
			expect(spyGet).toHaveBeenCalledWith(`${HeroService['ENDPOINT_HEROES']}/${fakeId}`)

			expect(messageService.add).toHaveBeenCalledTimes(1)
			// private member property, use string accessor to avoid cast to any
			expect(messageService.add).toHaveBeenCalledWith(`[ HeroService ] ${HeroService['MSG_HERO_FETCHED']}, id=${fakeId}`)
		})
	})

	xdescribe('invoke getHeroes()', () => {
		let subGetHeroes: Subscription
		let spyGet: jasmine.Spy

		beforeEach(() => {
			spyGet = spyOn(mockNet, 'get').and.returnValue(of([
				{ id: 1, name: 'heroone', } as Hero,
			]))

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

	xdescribe('invoke updateHero()', () => {
		const fakeHero: Hero = { id: 1, name: 'heroone' }
		let subUpdateHero: Subscription
		let spyPut: jasmine.Spy

		beforeEach((done) => {
			spyPut = spyOn(mockNet, 'put').and.returnValue(of(fakeHero))

			subUpdateHero = service.updateHero(fakeHero).subscribe(done)
		})

		afterEach(() => {
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

			expect(messageService.add).toHaveBeenCalledTimes(1)
			// private member property, use string accessor to avoid cast to any
			expect(messageService.add).toHaveBeenCalledWith(`[ HeroService ] ${HeroService['MSG_HERO_UPDATED']} id=${fakeHero.id}`)
		})
	})
})
