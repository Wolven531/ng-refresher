import { Injectable } from '@angular/core'
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api'
import { Observable } from 'rxjs'
import { HEROES } from '../mock-heroes'
import { Hero } from './hero/hero.interface'

@Injectable({
	providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
	constructor() { }

	createDb(reqInfo?: RequestInfo): {} | Observable<{}> | Promise<{}> {
		const heroes = HEROES

		return { heroes }
	}

	// Overrides the genId method to ensure that a hero always has an id
	//
	// If heroes is empty, method returns initial number (11);
	// otherwise, method returns highest hero id + 1
	genId(heroes: Hero[]): number {
		return heroes.length > 0
			? Math.max(...heroes.map(hero => hero.id)) + 1
			: 11
	}
}
