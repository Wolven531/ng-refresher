import { CommonModule } from '@angular/common'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { of } from 'rxjs'
import { ApplicationPipesModule } from '../../application-pipes/application-pipes.module'
import { HeroService } from '../../hero.service'
import { Hero } from '../hero.interface'
import { HeroesComponent } from './heroes.component'

describe('HeroesComponent', () => {
	let component: HeroesComponent
	let fixture: ComponentFixture<HeroesComponent>
	let mockGetHeroes: jasmine.Spy

	beforeEach(async () => {
		mockGetHeroes = jasmine.createSpy().and.returnValue(
			of([
				{ id: 1, name: 'test name' } as Hero,
				{ id: 2, name: 'test name 2' } as Hero,
			])
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
	})
})
