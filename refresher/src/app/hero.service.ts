import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { Hero } from '../app/hero.interface'
import { HEROES } from '../mock-heroes'
import { MessageService } from './message.service'

@Injectable({
	providedIn: 'root',
})
export class HeroService {
	private static MSG_HEROES_FETCHED = '[ HeroService ] heroes fetched'

	constructor(
		private readonly messageService: MessageService,
	) { }

	getHeroes(): Observable<Hero[]> {
		this.messageService.add(HeroService.MSG_HEROES_FETCHED)

		return of(HEROES)
	}
}
