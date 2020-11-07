import { Component, Input, OnInit } from '@angular/core'

import { Hero } from '../hero.interface'

@Component({
	selector: 'app-hero-detail',
	styleUrls: ['./hero-detail.component.sass'],
	templateUrl: './hero-detail.component.html',
})
export class HeroDetailComponent implements OnInit {
	@Input() hero: Hero

	constructor() { }

	ngOnInit(): void {
	}
}
