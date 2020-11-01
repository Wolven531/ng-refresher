import { Component, OnInit } from '@angular/core'
import { Hero } from '../hero.interface'

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

	constructor() { }

	ngOnInit(): void {
	}
}
