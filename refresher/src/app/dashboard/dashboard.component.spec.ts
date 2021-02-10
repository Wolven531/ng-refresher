import { CommonModule } from '@angular/common'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { of } from 'rxjs'
import { ApplicationPipesModule } from '../application-pipes/application-pipes.module'
import { HeroService } from '../hero.service'
import { HeroSearchComponent } from '../hero/hero-search/hero-search.component'
import { Hero } from '../hero/hero.interface'
import { DashboardComponent } from './dashboard.component'

describe('DashboardComponent', () => {
	let component: DashboardComponent
	let fixture: ComponentFixture<DashboardComponent>
	let mockGetHeroes: jasmine.Spy

	beforeEach(async () => {
		mockGetHeroes = jasmine.createSpy().and.returnValue(
			of([ ] as Hero[])
		)

		await TestBed.configureTestingModule({
			declarations: [
				DashboardComponent,
				HeroSearchComponent, // used in template
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

		fixture = TestBed.createComponent(DashboardComponent)
		component = fixture.componentInstance
	})

	it('creates component', () => {
		expect(component).toBeTruthy()
	})

	describe('after ngOnInit()', () => {
		beforeEach(() => {
			component.ngOnInit()
		})

		it('invokes HeroService.getHeroes()', () => {
			expect(mockGetHeroes).toHaveBeenCalledTimes(1)
		})
	})
})
