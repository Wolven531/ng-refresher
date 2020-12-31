import { CommonModule } from '@angular/common'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { of } from 'rxjs'
import { ApplicationPipesModule } from '../../application-pipes/application-pipes.module'
import { HeroService } from '../../hero.service'
import { Hero } from '../hero.interface'
import { HeroesComponent } from './heroes.component'

describe('HeroesComponent', () => {
	const MOCK_HERO_1: Hero = { id: 1, name: 'test name' }
	const MOCK_HERO_2: Hero = { id: 2, name: 'test name 2' }

	let component: HeroesComponent
	let fixture: ComponentFixture<HeroesComponent>
	let mockAddHero: jasmine.Spy
	let mockDeleteHero: jasmine.Spy
	let mockGetHeroes: jasmine.Spy

	beforeEach(async () => {
		mockAddHero = jasmine.createSpy().and.returnValue(of(MOCK_HERO_1))
		mockDeleteHero = jasmine.createSpy().and.returnValue(of())
		mockGetHeroes = jasmine.createSpy().and.returnValue(
			of([ MOCK_HERO_1, MOCK_HERO_2 ])
		)

		await TestBed.configureTestingModule({
			declarations: [
				HeroesComponent,
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
						addHero: mockAddHero,
						deleteHero: mockDeleteHero,
						getHeroes: mockGetHeroes,
					},
				},
			],
		})
			.compileComponents()

		fixture = TestBed.createComponent(HeroesComponent)
		component = fixture.componentInstance
	})

	it('creates component', () => {
		expect(component).toBeTruthy()
	})

	describe('after ngOnInit()', () => {
		let spyLoadHeroes: jasmine.Spy

		beforeEach(() => {
			spyLoadHeroes = spyOn(component, 'loadHeroes').and.callThrough()

			component.ngOnInit()
		})

		it('invokes HeroService.getHeroes()', () => {
			expect(spyLoadHeroes).toHaveBeenCalledTimes(1)
			expect(mockGetHeroes).toHaveBeenCalledTimes(1)
		})

		describe('invoke deleteHero() w/ MOCK_HERO_1', () => {
			beforeEach(() => {
				component.deleteHero(MOCK_HERO_1)
			})

			it('invokes HeroService.deleteHero(), removes proper hero from heroes', () => {
				expect(mockDeleteHero).toHaveBeenCalledTimes(1)
				expect(mockDeleteHero).toHaveBeenCalledWith(MOCK_HERO_1)
				expect(component.heroes).toEqual([MOCK_HERO_2])
			})

			describe('invoke deleteHero() w/ MOCK_HERO_1 again (no longer exists)', () => {
				beforeEach(() => {
					mockDeleteHero.calls.reset()

					component.deleteHero(MOCK_HERO_1)
				})

				it('does NOT invoke HeroService.deleteHero(), leaves heroes unchanged', () => {
					expect(mockDeleteHero).not.toHaveBeenCalled()
					expect(component.heroes).toEqual([MOCK_HERO_2])
				})
			})

			describe('invoke addHero() w/ MOCK_HERO_1 name', () => {
				beforeEach(() => {
					component.addHero(MOCK_HERO_1.name)
				})

				it('invokes HeroService.addHero(), adds hero to heroes', () => {
					expect(mockAddHero).toHaveBeenCalledTimes(1)
					expect(mockAddHero).toHaveBeenCalledWith({ name: MOCK_HERO_1.name })
					expect(component.heroes).toEqual([MOCK_HERO_2, MOCK_HERO_1])
				})
			})

			describe('invoke addHero() w/ empty name', () => {
				beforeEach(() => {
					component.addHero('')
				})

				it('does NOT invoke HeroService.addHero(), leaves heroes unchanged', () => {
					expect(mockAddHero).not.toHaveBeenCalled()
					expect(component.heroes).toEqual([MOCK_HERO_2])
				})
			})
		})
	})
})
