import { CommonModule } from '@angular/common'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { ApplicationPipesModule } from 'src/app/application-pipes/application-pipes.module'
import { HeroService } from 'src/app/hero.service'
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
					useClass: HeroService
				},
			],
		})
			.compileComponents()

		fixture = TestBed.createComponent(HeroSearchComponent)
		component = fixture.componentInstance
	})

	it('creates component', () => {
		expect(component).toBeTruthy()
	})
})
