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
	hero: Hero = {
		id: 1,
		name: 'Wolfman',
	}
	heroes: Hero[] = HEROES

	constructor() { }

	ngOnInit(): void {
	}
}
