import { Component, OnInit } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'
import { Hero } from '../hero.interface'
import { HeroService } from '../../hero.service'

@Component({
	selector: 'app-hero-search',
	styleUrls: ['./hero-search.component.sass'],
	templateUrl: './hero-search.component.html',
})
export class HeroSearchComponent implements OnInit {
	private static MS_DELAY_SEARCH = 300

	heroes$: Observable<Hero[]>

	private searchQueries: Subject<string>

	constructor(private readonly heroService: HeroService) {
		this.searchQueries = new Subject<string>()
	}

	ngOnInit(): void {
		this.heroes$ = this.searchQueries.pipe(
			debounceTime(HeroSearchComponent.MS_DELAY_SEARCH), // wait between keystrokes
			distinctUntilChanged(), // ignore new query if not distinct
			switchMap(query => this.heroService.searchHeroes(query)), // switch to new Observable on each change
		)
	}

	searchHeroes(query: string): void {
		this.searchQueries.next(query) // push query into Observable stream
	}
}
