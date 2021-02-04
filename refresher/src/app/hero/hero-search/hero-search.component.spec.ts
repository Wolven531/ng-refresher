import { CommonModule } from '@angular/common'
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { of, Subscription } from 'rxjs'
import { ApplicationPipesModule } from '../../application-pipes/application-pipes.module'
import { HeroService } from '../../hero.service'
import { Hero } from '../hero.interface'
import { HeroSearchComponent } from './hero-search.component'

describe('HeroSearchComponent', () => {
	let component: HeroSearchComponent
	let fixture: ComponentFixture<HeroSearchComponent>
	let mockHeroService: HeroService

	beforeEach(async () => {
		mockHeroService = jasmine.createSpyObj<HeroService>(['searchHeroes'], []);

		(mockHeroService.searchHeroes as jasmine.Spy).and.returnValue(of([] as Hero[]))

		await TestBed.configureTestingModule({
			declarations: [
				HeroSearchComponent,
			],
			imports: [
				CommonModule,
				FormsModule,
				ApplicationPipesModule,
			],
			providers: [
				{
					provide: HeroService,
					useValue: mockHeroService,
				},
			],
		})
			.compileComponents()

		fixture = TestBed.createComponent(HeroSearchComponent)
		component = fixture.componentInstance
	})

	it('creates component', () => {
		expect(component).toBeTruthy()
		expect((component as any).searchQueries).toBeTruthy()
	})

	describe('after ngOnInit()', () => {
		beforeEach(() => {
			component.ngOnInit()
		})

		it('sets heroes$ Observable', () => {
			expect(component.heroes$).toBeTruthy()
		})

		describe('invoke searchHeroes()', () => {
			let spyNext: jasmine.Spy
			let subHeroes: Subscription

			beforeEach(fakeAsync(() => {
				spyNext = spyOn(component['searchQueries'], 'next')
					.and.callThrough()

				component.searchHeroes('a')
				subHeroes = component.heroes$.subscribe()

				tick(HeroSearchComponent['MS_DELAY_SEARCH'] + 1)

				// approach 1 - manually use setTimeout() and done()
				// // must delay to account for debounceTime()
				// setTimeout(() => {
				// 	// must detect changes so pipe executes
				// 	fixture.detectChanges()
				// 	done()
				// }, (HeroSearchComponent as any).MS_DELAY_SEARCH + 1);

				// approach 2 - use fakeAsync() and tick() in beforeEach()
				// tick((HeroSearchComponent as any).MS_DELAY_SEARCH + 1)
				fixture.detectChanges()
			}))

			afterEach(() => {
				subHeroes.unsubscribe()
			})

			it('passes query to searchQueries Subject', () => {
				expect(spyNext).toHaveBeenCalledTimes(1)
				expect(spyNext).toHaveBeenCalledWith('a')

				// approach 3 - use fakeAsync and tick() in it()
				// tick((HeroSearchComponent as any).MS_DELAY_SEARCH + 1)
				// fixture.detectChanges()

				// TODO - enable assertions when it is figured out
				// expect(heroService.searchHeroes).toHaveBeenCalledTimes(1)
				// expect(mockHeroService.searchHeroes).toHaveBeenCalledWith('a')
			})
		})
	})
})
