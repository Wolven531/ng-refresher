import { Component, OnInit } from '@angular/core'
import { Hero } from '../hero/hero.interface'
import { HeroService } from '../hero/hero.service'

@Component({
	selector: 'app-dashboard',
	styleUrls: ['./dashboard.component.sass'],
	templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
	heroes: Hero[]

	constructor(
		private readonly heroService: HeroService,
	) {
		this.heroes = []
	}

	loadHeroes(): void {
		this.heroService.getHeroes()
			.subscribe(heroes => this.heroes = heroes.slice(1, 5))
	}

	ngOnInit(): void {
		this.loadHeroes()
	}
}
