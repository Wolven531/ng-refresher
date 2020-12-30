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
	let mockDeleteHero: jasmine.Spy
	let mockGetHeroes: jasmine.Spy

	beforeEach(async () => {
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
		})
	})
})
