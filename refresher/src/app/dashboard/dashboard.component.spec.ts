import { CommonModule } from '@angular/common'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { ApplicationPipesModule } from '../application-pipes/application-pipes.module'
import { HeroService } from '../hero.service'
import { DashboardComponent } from './dashboard.component'

describe('DashboardComponent', () => {
	let component: DashboardComponent
	let fixture: ComponentFixture<DashboardComponent>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				DashboardComponent,
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

		fixture = TestBed.createComponent(DashboardComponent)
		component = fixture.componentInstance
	})

	it('creates component', () => {
		expect(component).toBeTruthy()
	})
})
