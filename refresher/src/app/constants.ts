export interface GeoCoord {
	accuracy: number
	altitude: number
	altitudeAccuracy: number
	heading: number
	latitude: number
	longitude: number
	speed: number
}

export interface GeoPos {
	coords: GeoCoord
	timestamp: number
}
