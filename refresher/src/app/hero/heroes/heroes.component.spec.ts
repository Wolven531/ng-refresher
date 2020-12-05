import { CommonModule } from '@angular/common'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { of } from 'rxjs'
import { ApplicationPipesModule } from 'src/app/application-pipes/application-pipes.module'
import { HeroService } from 'src/app/hero.service'
import { Hero } from '../hero.interface'
import { HeroesComponent } from './heroes.component'

describe('HeroesComponent', () => {
	let component: HeroesComponent
	let fixture: ComponentFixture<HeroesComponent>

	beforeEach(async () => {
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
						getHeroes: jasmine.createSpy().and
							.returnValue(of([
								{ id: 1, name: 'test name' } as Hero,
								{ id: 2, name: 'test name 2' } as Hero,
							])),
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
})