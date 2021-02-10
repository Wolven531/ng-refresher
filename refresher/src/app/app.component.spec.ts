import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterModule } from '@angular/router'
import { AppComponent } from './app.component'
import { MessagesComponent } from './messages/messages.component'

describe('AppComponent', () => {
	let component: AppComponent
	let fixture: ComponentFixture<AppComponent>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				AppComponent,
				MessagesComponent,
			],
			imports: [
				RouterModule.forRoot([]),
			],
		}).compileComponents()

		fixture = TestBed.createComponent(AppComponent)
		component = fixture.componentInstance
	})

	it('creates component', () => {
		expect(component).toBeTruthy()
	})

	it(`has title 'refresher'`, () => {
		expect(component.title).toEqual('refresher')
	})
})
