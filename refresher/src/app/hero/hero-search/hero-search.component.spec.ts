import { CommonModule } from '@angular/common'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { of } from 'rxjs'
import { ApplicationPipesModule } from 'src/app/application-pipes/application-pipes.module'
import { HeroService } from 'src/app/hero.service'
import { Hero } from '../hero.interface'
import { HeroSearchComponent } from './hero-search.component'

describe('HeroSearchComponent', () => {
	let component: HeroSearchComponent
	let fixture: ComponentFixture<HeroSearchComponent>

	beforeEach(async () => {
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
					useValue: {
						searchHeroes: jasmine.createSpy().and.returnValue(of([] as Hero[])),
					},
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

			beforeEach(() => {
				spyNext = spyOn((component as any).searchQueries, 'next')
					.and.callThrough()

				component.searchHeroes('a')
			})

			it('passes query to searchQueries Subject', () => {
				expect(spyNext).toHaveBeenCalledTimes(1)
				expect(spyNext).toHaveBeenCalledWith('a')
			})
		})
	})
})
