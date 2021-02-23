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
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.sass']
})
export class GameComponent implements OnInit {
	ngOnInit(): void {
		if (!window.navigator.geolocation) {
			return
		}

		window.navigator.geolocation.getCurrentPosition(
			this.handlePositionLoaded,
			this.handlePositionError,
			{
				enableHighAccuracy: true,
			}
		)
	}

	private handlePositionLoaded(position: GeoPos): void {
		position.coords.accuracy
		position.coords.altitude
		position.coords.altitudeAccuracy
		position.coords.heading
		position.coords.latitude
		position.coords.longitude
		position.coords.speed
	}

	private handlePositionError(): void {
	}
}
