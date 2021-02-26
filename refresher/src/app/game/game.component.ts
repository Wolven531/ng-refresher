import { Component, OnInit } from '@angular/core'

interface GeoCoord {
	accuracy: number
	altitude: number
	altitudeAccuracy: number
	heading: number
	latitude: number
	longitude: number
	speed: number
}

interface GeoPos {
	coords: GeoCoord
	timestamp: number
}

@Component({
	selector: 'app-game',
	styleUrls: ['./game.component.sass'],
	templateUrl: './game.component.html',
})
export class GameComponent implements OnInit {
	ngOnInit(): void {
		if (!window.navigator.geolocation) {
			return
		}

		if (!window.navigator.permissions) {
			this.getCurrentPosition()
			return
		}

		window.navigator.permissions
			.query({ name:'geolocation' })
			.then(result => {
				const token = 'geolocation permission'

				switch (result.state) { // 'denied' | 'granted' | 'prompt'
					case 'prompt':
						console.info(`${token} prompt...`)
						return
					case 'granted':
						console.info(`${token} granted...`)
						this.getCurrentPosition()
						return
					case 'denied':
					default:
						console.info(`${token} denied...`)
						return
				}
			})
	}

	private getCurrentPosition(): void {
		window.navigator.geolocation.getCurrentPosition(
			this.handlePositionLoaded,
			this.handlePositionError,
			{
				enableHighAccuracy: true,
			}
		)
	}

	private handlePositionLoaded(position: GeoPos): void {
	}

	private handlePositionError(): void {
	}
}
