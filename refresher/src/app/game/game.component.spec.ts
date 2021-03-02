import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { GeoPos } from '../constants'
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

	describe('invoke ngOnInit() when window.navigator.permissions is granted and getCurrentPosition invokes success callback', () => {
		beforeEach(waitForAsync(() => {
			spyOn(window.navigator.geolocation, 'getCurrentPosition').and
				.callFake((success, failure, opts) => {
					// invoke success callback ourselves w/ fake position object
					success({
						coords: {
							accuracy: 100,
							altitude: 0,
							altitudeAccuracy: 100,
							heading: 1,
							latitude: 100,
							longitude: 100,
							speed: 1,
						},
						timestamp: (new Date()).getTime()
					} as GeoPos)
				})
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

	describe('invoke ngOnInit() when window.navigator.permissions is granted and getCurrentPosition invokes failure callback', () => {
		beforeEach(waitForAsync(() => {
			spyOn(window.navigator.geolocation, 'getCurrentPosition').and
				.callFake((success, failure, opts) => {
					// invoke failure callback ourselves w/ mocked GeolocationPositionError object
					failure({
						code: -1,
						message: '',
						PERMISSION_DENIED: 0,
						POSITION_UNAVAILABLE: 1,
						TIMEOUT: 0,
					})
				})
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
