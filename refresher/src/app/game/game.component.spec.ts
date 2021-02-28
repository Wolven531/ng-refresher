import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { GameComponent } from './game.component'

describe('GameComponent', () => {
	let component: GameComponent
	let fixture: ComponentFixture<GameComponent>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ GameComponent ]
		}).compileComponents()

		fixture = TestBed.createComponent(GameComponent)
		component = fixture.componentInstance
	})

	it('creates component', () => {
		expect(component).toBeTruthy()
	})

	describe('invoke ngOnInit() when window.navigator.permissions is undefined', () => {
		beforeEach(() => {
			spyOn(window.navigator.geolocation, 'getCurrentPosition')
			spyOnProperty(window.navigator, 'permissions').and.returnValue(undefined)

			component.ngOnInit()
		})

		it('invokes window.navigator.geolocation.getCurrentPosition() properly', () => {
			expect(window.navigator.geolocation.getCurrentPosition).toHaveBeenCalledOnceWith(
				component['handlePositionLoaded'],
				component['handlePositionError'],
				{
					enableHighAccuracy: true,
				}
			)
		})
	})

	describe('invoke ngOnInit() when window.navigator.permissions is granted', () => {
		beforeEach(waitForAsync(() => {
			spyOn(window.navigator.geolocation, 'getCurrentPosition')
			spyOn(window.navigator.permissions, 'query').and
				.returnValue(Promise.resolve<PermissionStatus>({ state: 'granted' } as PermissionStatus))

			component.ngOnInit()
		}))

		it('invokes window.navigator.geolocation.getCurrentPosition() properly', () => {
			expect(window.navigator.permissions.query).toHaveBeenCalledOnceWith({ name: 'geolocation' })
			expect(window.navigator.geolocation.getCurrentPosition).toHaveBeenCalledOnceWith(
				component['handlePositionLoaded'],
				component['handlePositionError'],
				{
					enableHighAccuracy: true,
				}
			)
		})
	})
})
