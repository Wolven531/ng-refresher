import { HttpClient } from '@angular/common/http'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TestBed, waitForAsync } from '@angular/core/testing'
import { of, Subscription, throwError } from 'rxjs'
import { HeroService } from './hero.service'
import { Hero } from './hero/hero.interface'
import { MessageService } from './message.service'

describe('HeroService', () => {
	const FAKE_HERO: Hero = { id: 1, name: 'heroone' }

	let messageService: MessageService
	let mockNet: jasmine.SpyObj<HttpClient>
	let service: HeroService

	beforeEach(async () => {
		mockNet = jasmine.createSpyObj<HttpClient>(['delete', 'get', 'post', 'put'], []);

		mockNet.delete.and.returnValue(of())
		mockNet.post.and.returnValue(of(FAKE_HERO))
		mockNet.put.and.returnValue(of(FAKE_HERO))
		// spyOn(mockNet, 'delete')										// err - TypeError: Cannot read property 'pipe' of undefined
		// spyOn(mockNet, 'delete').and.resolveTo()						// err - TypeError: this.net.delete(...).pipe is not a function
		// spyOn(mockNet, 'delete').and.callFake(jasmine.createSpy())	// err - TypeError: Cannot read property 'pipe' of undefined
		// spyOn(mockNet, 'delete').and
		// 	.callFake(jasmine.createSpy('delete', mockNet.delete)) 		// err - compile error
		
		// const mockDel = jasmine.createSpy('delete', mockNet.delete)
		// spyOn(mockNet, 'delete').and.callFake(mockDel as any) 		// err - TypeError: Cannot read property 'pipe' of undefined

		// spyOn(mockNet, 'delete').and.callFake((url, options) => of<any>()) // works, but does not execute calback code

		// (mockNet.delete as jasmine.Spy).and.returnValue(of()) 		// err - `and` is undefined

		await TestBed.configureTestingModule({
			imports: [
				HttpClientTestingModule,
			],
			providers: [
				{
					provide: HttpClient,
					useValue: mockNet,
				}
			],
		}).compileComponents()

		// inject service to test
		service = TestBed.inject(HeroService)

		// inject service dependencies
		messageService = TestBed.inject(MessageService)
		// mockNet = TestBed.inject(HttpClient)

		// set up mocks / spies on dependencies
		spyOn(messageService, 'add').and.callFake(jasmine.createSpy())
	})

	it('creates service', () => {
		expect(service).toBeTruthy()
	})

	describe('invoke addHero()', () => {
		let subAddHero: Subscription

		beforeEach(() => {
			subAddHero = service.addHero(FAKE_HERO).subscribe()
		})

		afterEach(() => {
			subAddHero.unsubscribe()
		})

		it('invokes HttpClient.post() properly', () => {
			// private member property, use string accessor to avoid cast to any
			expect(mockNet.post).toHaveBeenCalledOnceWith(
				HeroService['ENDPOINT_HEROES'],
				FAKE_HERO,
				service['httpOptions'],
			)

			// private member property, use string accessor to avoid cast to any
			expect(messageService.add).toHaveBeenCalledOnceWith(`[ HeroService ] ${HeroService['MSG_HERO_ADDED']} w/ id=${FAKE_HERO.id}`)
		})
	})

	describe('invoke deleteHero()', () => {
		let subDeleteHero: Subscription

		beforeEach(() => {
			subDeleteHero = service.deleteHero(FAKE_HERO.id).subscribe()
		})

		afterEach(() => {
			subDeleteHero.unsubscribe()
		})

		it('invokes HttpClient.delete() properly', () => {
			expect(mockNet.delete).toHaveBeenCalledOnceWith(
				// private member property, use string accessor to avoid cast to any
				`${HeroService['ENDPOINT_HEROES']}/${FAKE_HERO.id}`,
				service['httpOptions'],
			)

			// TODO - re-enable beow assertions once working
			// private member property, use string accessor to avoid cast to any
			// expect(messageService.add).toHaveBeenCalledOnceWith(`[ HeroService ] ${HeroService['MSG_HERO_DELETED']}, id=${fakeHero.id}`)
		})
	})

	describe('invoke getHero()', () => {
		let subGetHero: Subscription

		beforeEach(() => {
			mockNet.get.and.returnValue(of(FAKE_HERO))

			subGetHero = service.getHero(1).subscribe()
		})

		afterEach(() => {
			subGetHero.unsubscribe()
		})

		it('invokes HttpClient.get() properly', () => {
			// private member property, use string accessor to avoid cast to any
			expect(mockNet.get).toHaveBeenCalledOnceWith(`${HeroService['ENDPOINT_HEROES']}/${FAKE_HERO.id}`)

			// private member property, use string accessor to avoid cast to any
			expect(messageService.add).toHaveBeenCalledOnceWith(`[ HeroService ] ${HeroService['MSG_HERO_FETCHED']}, id=${FAKE_HERO.id}`)
		})
	})

	describe('when getHero() throws error', () => {
		const fakeError = new Error('fake error')

		it('invokes handleError() properly', waitForAsync(done => {
			mockNet.get.and.returnValue(
				throwError(fakeError)
			)

			service.getHero(1).subscribe({
				error: err => {
					expect(window.console.error).toHaveBeenCalledOnceWith(err)
					// !!! FIXME - below should **NOT** pass
					expect(err).toEqual({})
					// !!! FIXME - below should **NOT** pass
					expect(messageService.add).toHaveBeenCalledOnceWith(`asdfqwer`)
					done()
				},
			})
		}))
	})

	describe('invoke getHeroes()', () => {
		let subGetHeroes: Subscription

		beforeEach(() => {
			mockNet.get.and.returnValue(of([FAKE_HERO]))

			subGetHeroes = service.getHeroes().subscribe()
		})

		afterEach(() => {
			subGetHeroes.unsubscribe()
		})

		it('invokes HttpClient.get() properly', () => {
			// private member property, use string accessor to avoid cast to any
			expect(mockNet.get).toHaveBeenCalledOnceWith(HeroService['ENDPOINT_HEROES'])

			// private member property, use string accessor to avoid cast to any
			expect(messageService.add).toHaveBeenCalledOnceWith(`[ HeroService ] ${HeroService['MSG_HEROES_FETCHED']}`)
		})
	})

	describe('invoke searchHeroes()', () => {
		const fakeSearchTerm = 'a'
		let subSearchHeroes: Subscription

		beforeEach(() => {
			mockNet.get.and.returnValue(of([FAKE_HERO]))

			subSearchHeroes = service.searchHeroes(fakeSearchTerm).subscribe()
		})

		afterEach(() => {
			subSearchHeroes.unsubscribe()
		})

		it('invokes HttpClient.get() properly', () => {
			// private member property, use string accessor to avoid cast to any
			expect(mockNet.get).toHaveBeenCalledOnceWith(`${HeroService['ENDPOINT_HEROES']}/?name=${fakeSearchTerm}`)

			// private member property, use string accessor to avoid cast to any
			expect(messageService.add).toHaveBeenCalledOnceWith(`[ HeroService ] ${HeroService['MSG_HEROES_FOUND']}, query="${fakeSearchTerm}"`)
		})
	})

	describe('invoke updateHero()', () => {
		let subUpdateHero: Subscription

		beforeEach(() => {
			subUpdateHero = service.updateHero(FAKE_HERO).subscribe()
		})

		afterEach(() => {
			subUpdateHero.unsubscribe()
		})

		it('invokes HttpClient.put() properly', () => {
			// private member property, use string accessor to avoid cast to any
			expect(mockNet.put).toHaveBeenCalledOnceWith(
				HeroService['ENDPOINT_HEROES'],
				FAKE_HERO,
				service['httpOptions'],
			)

			// private member property, use string accessor to avoid cast to any
			expect(messageService.add).toHaveBeenCalledOnceWith(`[ HeroService ] ${HeroService['MSG_HERO_UPDATED']} id=${FAKE_HERO.id}`)
		})
	})
})
