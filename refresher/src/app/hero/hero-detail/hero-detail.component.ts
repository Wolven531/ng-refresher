import { Location } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { HeroService } from '../../hero.service'
import { Hero } from '../hero.interface'

const TOKEN = 'HeroDetail'

@Component({
	selector: 'app-hero-detail',
	styleUrls: ['./hero-detail.component.sass'],
	templateUrl: './hero-detail.component.html',
})
export class HeroDetailComponent implements OnInit {
	hero: Hero

	constructor(
		private location: Location,
		private route: ActivatedRoute,
		private heroService: HeroService,
	) {
		console.info(`[ ${TOKEN} | ctor ]`)
	}

	ngOnInit(): void {
		console.info(`[ ${TOKEN} | ngOnInit ]`)
		this.loadHero()
	}

	goBack(): void {
		console.info(`[ ${TOKEN} | goBack ]`)
		this.location.back()
	}

	save(): void {
		console.info(`[ ${TOKEN} | save ]`)

		this.heroService.updateHero(this.hero)
			.subscribe()
	}

	private loadHero(): void {
		const sig = `[ ${TOKEN} | loadHero ]`
		console.info(sig)

		const id = parseInt(this.route.snapshot.paramMap.get('id'), 10)
		console.info(`${sig} parsed from route, id="${id}"`)

		this.heroService.getHero(id)
			.subscribe(h => {
				console.info(`${sig} callback, h.name="${h.name}"`)
				this.hero = h
			})
	}
}
