import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { MessageService } from './message.service'
import { Hero } from './hero/hero.interface'

@Injectable({
	providedIn: 'root',
})
export class HeroService {
	private static ENDPOINT_HEROES = 'api/heroes'
	private static MSG_HERO_ADDED = 'hero added'
	private static MSG_HERO_DELETED = 'hero deleted'
	private static MSG_HERO_FETCHED = 'hero fetched'
	private static MSG_HERO_UPDATED = 'updated hero'
	private static MSG_HEROES_FETCHED = 'all heroes fetched'
	private static MSG_HEROES_FOUND = 'found heroes'
	private static MSG_HEROES_NOT_FOUND = 'no heroes found'

	private httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
		}),
	}

	constructor(
		private readonly net: HttpClient,
		private readonly messageService: MessageService,
	) { }

	addHero(hero: Hero): Observable<Hero> {
		return this.net.post<Hero>(HeroService.ENDPOINT_HEROES, hero, this.httpOptions)
			.pipe(
				tap(newHero => this.log(`${HeroService.MSG_HERO_ADDED} w/ id=${newHero.id}`)),
				catchError(this.handleError<Hero>('addHero')),
			)
	}

	deleteHero(heroOrId: Hero | number): Observable<any> {
		const heroId = typeof heroOrId === 'number'
			? heroOrId
			: heroOrId.id
		const url = `${HeroService.ENDPOINT_HEROES}/${heroId}`

		return this.net.delete<any>(url, this.httpOptions)
			.pipe(
				tap(_ => this.log(`${HeroService.MSG_HERO_DELETED}, id=${heroId}`)),
				catchError(this.handleError<any>('deleteHero')),
			)
	}

	getHero(id: number): Observable<Hero> {
		return this.net.get<Hero>(`${HeroService.ENDPOINT_HEROES}/${id}`)
			.pipe(
				tap(_ => this.log(`${HeroService.MSG_HERO_FETCHED}, id=${id}`)),
				catchError(this.handleError<Hero>(`getHero id=${id}`)),
			)
	}

	getHeroes(): Observable<Hero[]> {
		return this.net.get<Hero[]>(HeroService.ENDPOINT_HEROES)
			.pipe(
				tap(_ => this.log(HeroService.MSG_HEROES_FETCHED)),
				catchError(this.handleError<Hero[]>('getHeroes', [])),
			)
	}

	searchHeroes(query: string): Observable<Hero[]> {
		query = query.trim()

		if (query.length < 1) {
			return of([])
		}

		return this.net.get<Hero[]>(`${HeroService.ENDPOINT_HEROES}/?name=${query}`)
			.pipe(
				tap(x =>
					this.log(x.length > 0
						? `${HeroService.MSG_HEROES_FOUND}, query="${query}"`
						: `${HeroService.MSG_HEROES_NOT_FOUND}, query="${query}"`
					)
				),
				catchError(this.handleError<Hero[]>('searchheroes', [])),
			)
	}

	updateHero(hero: Hero): Observable<any> {
		return this.net.put(HeroService.ENDPOINT_HEROES, hero, this.httpOptions)
			.pipe(
				tap(_ => this.log(`${HeroService.MSG_HERO_UPDATED} id=${hero.id}`)),
				catchError(this.handleError<any>('updateHero')),
			)
	}

	/**
	 * Handle Http operation that failed; allows app to continue
	 *
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
	private handleError<T>(operation = 'operation', result?: T): (err: any) => Observable<T> {
		return (error: any): Observable<T> => {
			// TODO: send the error to remote logging infrastructure
			console.error(error)

			// TODO: better job of transforming error for user consumption
			this.log(`[ HeroService ] ${operation} failed - ${error.message}`)

			return of(result)
		}
	}

	private log(message: string): void {
		this.messageService.add(`[ HeroService ] ${message}`)
	}
}
