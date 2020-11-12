import { Location } from '@angular/common'
import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Hero } from '../hero.interface'
import { HeroService } from '../hero.service'

@Component({
	selector: 'app-hero-detail',
	styleUrls: ['./hero-detail.component.sass'],
	templateUrl: './hero-detail.component.html',
})
export class HeroDetailComponent implements OnInit {
	@Input() hero: Hero

	constructor(
		private readonly location: Location,
		private readonly route: ActivatedRoute,
		private readonly heroService: HeroService,
	) { }

	ngOnInit(): void {
		this.loadHero()
	}

	loadHero(): void {
		const id = parseInt(this.route.snapshot.paramMap.get('id'), 10)

		this.heroService.getHero(id)
			.subscribe(hero => this.hero = hero)
	}
}
