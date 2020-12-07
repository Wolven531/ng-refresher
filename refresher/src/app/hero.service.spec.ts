import { HttpClient } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'
import { of } from 'rxjs'
import { HeroService } from './hero.service'
import { MessageService } from './message.service'

describe('HeroService', () => {
	let service: HeroService

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: HttpClient,
					useValue: {
						delete: jasmine.createSpy().and.returnValue(of({})),
						get: jasmine.createSpy().and.returnValue(of({})),
						post: jasmine.createSpy().and.returnValue(of({})),
						put: jasmine.createSpy().and.returnValue(of({})),
					},
				},
				{
					provide: MessageService,
					useValue: {
						add: jasmine.createSpy(),
					},
				},
			],
		})

		service = TestBed.inject(HeroService)
	})

	it('creates service', () => {
		expect(service).toBeTruthy()
	})
})
