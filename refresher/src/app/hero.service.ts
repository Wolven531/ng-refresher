import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { Hero } from '../app/hero.interface'
import { HEROES } from '../mock-heroes'
import { MessageService } from './message.service'

@Injectable({
	providedIn: 'root',
})
export class HeroService {
	private static ENDPOINT_HEROES = 'api/heroes'
	private static MSG_HERO_FETCHED = 'hero fetched'
	private static MSG_HEROES_FETCHED = 'all heroes fetched'

	constructor(
		private readonly net: HttpClient,
		private readonly messageService: MessageService,
	) { }

	getHero(id: number): Observable<Hero> {
		// TODO - send message **after** fetching hero
		this.log(`${HeroService.MSG_HERO_FETCHED}, id=${id}`)

		return of(HEROES.find(hero => hero.id === id))
	}

	getHeroes(): Observable<Hero[]> {
		this.log(HeroService.MSG_HEROES_FETCHED)

		return of(HEROES)
	}

	private log(message: string): void {
		this.messageService.add(`[ HeroService ] ${message}`)
	}
}
