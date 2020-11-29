import { Component, OnInit } from '@angular/core'
import { Hero } from '../hero/hero.interface'
import { HeroService } from '../hero.service'

@Component({
	selector: 'app-heroes',
	styleUrls: ['./heroes.component.sass'],
	templateUrl: './heroes.component.html',
})
export class HeroesComponent implements OnInit {
	heroes: Hero[]

	constructor(
		private readonly heroService: HeroService,
	) {
		this.heroes = []
	}

	addHero(name: string): void {
		name = name.trim()

		if (name.length < 1) {
			return
		}

		this.heroService.addHero({ name } as Hero)
			.subscribe(hero => {
				this.heroes.push(hero)
			})
	}

	deleteHero(hero: Hero): void {
		this.heroes = this.heroes.filter(h => h !== hero)
		this.heroService.deleteHero(hero).subscribe()
	}

	loadHeroes(): void {
		this.heroService.getHeroes()
			.subscribe(heroes => this.heroes = heroes)
	}

	ngOnInit(): void {
		this.loadHeroes()
	}
}
