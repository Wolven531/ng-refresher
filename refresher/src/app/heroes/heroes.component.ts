import { Component, OnInit } from '@angular/core'
import { Hero } from '../hero.interface'
import { HeroService } from '../hero.service'

@Component({
	selector: 'app-heroes',
	styleUrls: ['./heroes.component.sass'],
	templateUrl: './heroes.component.html',
})
export class HeroesComponent implements OnInit {
	heroes: Hero[]
	selectedHero: Hero

	constructor(
		private readonly heroService: HeroService,
	) { }

	loadHeroes(): void {
		this.heroService.getHeroes()
			.subscribe(heroes => this.heroes = heroes)
	}

	ngOnInit(): void {
		this.loadHeroes()
	}
}
