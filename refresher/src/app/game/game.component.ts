import { Component, OnInit } from '@angular/core'
import { Graticule, Map, View } from 'ol'
import { Coordinate } from 'ol/coordinate'
import TileLayer from 'ol/layer/Tile'
import 'ol/ol.css'
import { OSM } from 'ol/source'
import { Stroke } from 'ol/style'
import { GeoPos } from '../constants'

@Component({
	selector: 'app-game',
	styleUrls: ['./game.component.sass'],
	templateUrl: './game.component.html',
})
export class GameComponent implements OnInit {
	map: Map

	ngOnInit(): void {
		if (!window.navigator.geolocation) {
			return
		}

		if (!window.navigator.permissions) {
			this.getCurrentPosition()
			return
		}

		this.updateMap()

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
		this.map.setView(new View({
			center: [position.coords.longitude, position.coords.latitude],
			zoom: 5,
		}))
	}

	private handlePositionError(): void {
	}

	private updateMap(): void {
		// OSM stuff
		// more info - https://openlayers.org/en/latest/examples/localized-openstreetmap.html
		this.map = new Map({
			layers: [
				new TileLayer({
					source: new OSM(),
				}),
				new Graticule({
					showLabels: true,
					// the style to use for the lines, optional
					strokeStyle: new Stroke({
						color: 'rgba(255,120,0,0.9)',
						lineDash: [0.5, 4],
						width: 2,
					}),
					wrapX: false,
				}),
			],
			target: 'map',
			view: new View({
				center: [0, 0],
				zoom: 2,
			}),
		})
		// const openCycleMapLayer = new TileLayer({
		// 	source: new OSM({

		// 		// attributions: [
		// 		// 	'All maps © <a href="https://www.opencyclemap.org/">OpenCycleMap</a>',
		// 		// 	ATTRIBUTION],
		// 		// url:
		// 		// 	'https://{a-c}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png' +
		// 		// 	'?apikey=Your API key from http://www.thunderforest.com/docs/apikeys/ here',
		// 	}),
		// })

		// const openSeaMapLayer = new TileLayer({
		// 	source: new OSM({
		// 		attributions: [
		// 			'All maps © <a href="http://www.openseamap.org/">OpenSeaMap</a>',
		// 			ATTRIBUTION],
		// 		opaque: false,
		// 		url: 'https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png',
		// 	}),
		// })

		// const map = new Map({
		// 	layers: [openCycleMapLayer, openSeaMapLayer],
		// 	target: 'map',
		// 	view: new View({
		// 		center: [-244780.24508882355, 5986452.183179816],
		// 		maxZoom: 18,
		// 		zoom: 15,
		// 	}),
		// })
	}
}
