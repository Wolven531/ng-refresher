import { CommonModule } from '@angular/common'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { of } from 'rxjs'
import { ApplicationPipesModule } from '../../application-pipes/application-pipes.module'
import { HeroService } from '../../hero.service'
import { Hero } from '../hero.interface'
import { HeroDetailComponent } from './hero-detail.component'

describe('HeroDetailComponent', () => {
	let component: HeroDetailComponent
	let fixture: ComponentFixture<HeroDetailComponent>
	let heroService: HeroService

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				HeroDetailComponent,
			],
			imports: [
				CommonModule,
				FormsModule,
				ApplicationPipesModule,
			],
			providers: [
				{
					provide: Location,
					useValue: {
						back: jasmine.createSpy(),
					},
				},
				{
					provide: ActivatedRoute,
					useValue: {
						params: of({ id: '1' }),
						snapshot: {
							paramMap: {
								get: jasmine.createSpy().and.returnValue('1'),
							},
						},
					},
				},
				{
					provide: HeroService,
					useValue: {
						getHero: jasmine.createSpy().and
							.returnValue(of({ id: 1, name: 'test name' } as Hero)),
						updateHero: jasmine.createSpy().and
							.returnValue(of()),
					},
				},
			],
		})
			.compileComponents()

		fixture = TestBed.createComponent(HeroDetailComponent)

		heroService = TestBed.inject(HeroService)

		component = fixture.componentInstance
	})

	it('creates component', () => {
		expect(component).toBeTruthy()
	})

	describe('after ngOnInit()', () => {
		beforeEach(() => {
			component.ngOnInit()
		})

		it('invokes HeroService.getHero()', () => {
			expect(heroService.getHero).toHaveBeenCalledTimes(1)
		})
	})
})
