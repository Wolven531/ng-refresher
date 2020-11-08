import { Component, OnInit } from '@angular/core'
import { Hero } from '../hero.interface'
import { HeroService } from '../hero.service'
import { MessageService } from '../message.service'

@Component({
	selector: 'app-heroes',
	styleUrls: ['./heroes.component.sass'],
	templateUrl: './heroes.component.html',
})
export class HeroesComponent implements OnInit {
	private static MSG_HERO_SELECTED = '[ HeroComp ] hero selected'

	heroes: Hero[]
	selectedHero: Hero

	constructor(
		private readonly heroService: HeroService,
		private readonly messageService: MessageService,
	) { }

	loadHeroes(): void {
		this.heroService.getHeroes()
			.subscribe(heroes => this.heroes = heroes)
	}

	ngOnInit(): void {
		this.loadHeroes()
	}

	onHeroSelect(hero: Hero): void {
		this.selectedHero = hero

		this.messageService.add(`${HeroesComponent.MSG_HERO_SELECTED}, id=${hero.id}`)
	}
}
