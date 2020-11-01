import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-heroes',
	styleUrls: ['./heroes.component.sass'],
	templateUrl: './heroes.component.html',
})
export class HeroesComponent implements OnInit {
	hero = 'Wolfman'

	constructor() { }

	ngOnInit(): void {
	}
}
