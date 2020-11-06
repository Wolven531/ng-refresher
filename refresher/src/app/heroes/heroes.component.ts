import { Component, OnInit } from '@angular/core'
import { Hero } from '../hero.interface'

// mock data, will be replaced by server loaded data
import { HEROES } from '../../mock-heroes'

@Component({
	selector: 'app-heroes',
	styleUrls: ['./heroes.component.sass'],
	templateUrl: './heroes.component.html',
})
export class HeroesComponent implements OnInit {
	heroes: Hero[] = HEROES
	selectedHero: Hero

	constructor() { }

	ngOnInit(): void {
	}

	onHeroSelect(hero: Hero): void {
		this.selectedHero = hero
	}
}
