import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { Hero } from '../app/hero.interface'
import { HEROES } from '../mock-heroes'
import { MessageService } from './message.service'

@Injectable({
	providedIn: 'root',
})
export class HeroService {
	private static MSG_HERO_FETCHED = '[ HeroService ] hero fetched'
	private static MSG_HEROES_FETCHED = '[ HeroService ] all heroes fetched'

	constructor(
		private readonly messageService: MessageService,
	) { }

	getHero(id: number): Observable<Hero> {
		// TODO - send message **after** fetching hero
		this.messageService.add(`${HeroService.MSG_HERO_FETCHED}, id=${id}`)

		return of(HEROES.find(hero => hero.id === id))
	}

	getHeroes(): Observable<Hero[]> {
		this.messageService.add(HeroService.MSG_HEROES_FETCHED)

		return of(HEROES)
	}
}
