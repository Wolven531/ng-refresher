import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { of, Subscription } from 'rxjs'
import { HeroService } from './hero.service'
import { Hero } from './hero/hero.interface'
import { MessageService } from './message.service'

describe('HeroService', () => {
	let mockNet: HttpTestingController
	let service: HeroService
	let mockMessageService: MessageService

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpClientTestingModule,
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
		mockNet = TestBed.inject(HttpTestingController)
	})

	afterEach(() => {
		mockNet.verify()
	})

	it('creates service', () => {
		expect(service).toBeTruthy()
	})

	describe('invoke addHero()', () => {
		const fakeHero: Hero = { id: 1, name: 'heroone' }
		// let subAddHero: Subscription
		// let spyPost: jasmine.Spy

		beforeEach(() => {
			// spyPost = spyOn(mockNet, 'post').and.returnValue(of(fakeHero))

			// service.addHero(fakeHero)
			// 	.subscribe((newHero) => {
			// 		expect(newHero).toEqual(fakeHero)
			// 		// done()
			// 	})
		})

		afterEach(() => {
			// (mockMessageService.add as jasmine.Spy).calls.reset()
			// subAddHero.unsubscribe()
		})

		it('invokes HttpClient.post() properly', () => {
			// expect(spyPost).toHaveBeenCalledTimes(1)
			// private member property, use string accessor to avoid cast to any
			// expect(spyPost).toHaveBeenCalledWith(
			// 	HeroService['ENDPOINT_HEROES'],
			// 	fakeHero,
			// 	service['httpOptions'],
			// )
			service.addHero(fakeHero)
				.subscribe((newHero) => {
					expect(newHero).toEqual(fakeHero)
					// done()
				})
			let req = mockNet.expectOne(HeroService['ENDPOINT_HEROES'])
			expect(req.request.method.toLowerCase()).toBe('post')
			expect(req.request.body).toEqual(fakeHero)
			expect(req.request.headers).toEqual(service['httpOptions'].headers)
			req.flush(fakeHero)

			expect(mockMessageService.add).toHaveBeenCalledTimes(1)
			// private member property, use string accessor to avoid cast to any
			expect(mockMessageService.add).toHaveBeenCalledWith(`[ HeroService ] ${HeroService['MSG_HERO_ADDED']} w/ id=${fakeHero.id}`)
		})
	})

	// describe('invoke deleteHero()', () => {
	// 	const fakeHero: Hero = { id: 1, name: 'heroone' }
	// 	let subDeleteHero: Subscription
	// 	let spyDelete: jasmine.Spy

	// 	beforeEach((done) => {
	// 		spyDelete = spyOn(mockNet, 'delete').and.returnValue(of())

	// 		subDeleteHero = service.deleteHero(fakeHero.id).subscribe(done)
	// 	})

	// 	afterEach(() => {
	// 		(mockMessageService.add as jasmine.Spy).calls.reset()
	// 		subDeleteHero.unsubscribe()
	// 	})

	// 	it('invokes HttpClient.delete() properly', () => {
	// 		expect(spyDelete).toHaveBeenCalledTimes(1)
	// 		// private member property, use string accessor to avoid cast to any
	// 		expect(spyDelete).toHaveBeenCalledWith(
	// 			`${HeroService['ENDPOINT_HEROES']}/${fakeHero.id}`,
	// 			service['httpOptions'],
	// 		)

	// 		expect(mockMessageService.add).toHaveBeenCalledTimes(1)
	// 		// private member property, use string accessor to avoid cast to any
	// 		expect(mockMessageService.add).toHaveBeenCalledWith(`[ HeroService ] ${HeroService['MSG_HERO_DELETED']}, id=${fakeHero.id}`)
	// 	})
	// })

	xdescribe('invoke getHero()', () => {
		const fakeId = 1
		let subGetHero: Subscription
		let spyGet: jasmine.Spy

		beforeEach((done) => {
			// spyGet = spyOn(mockNet, 'get').and.returnValue(of(
			// 	{ id: fakeId, name: 'heroone', } as Hero,
			// ))

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

	xdescribe('invoke getHeroes()', () => {
		let subGetHeroes: Subscription
		let spyGet: jasmine.Spy

		beforeEach((done) => {
			// spyGet = spyOn(mockNet, 'get').and.returnValue(of([
			// 	{ id: 1, name: 'heroone', } as Hero,
			// ]))

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

	xdescribe('invoke updateHero()', () => {
		const fakeHero: Hero = { id: 1, name: 'heroone' }
		let subUpdateHero: Subscription
		let spyPut: jasmine.Spy

		beforeEach((done) => {
			// spyPut = spyOn(mockNet, 'put').and.returnValue(of(fakeHero))

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
})
