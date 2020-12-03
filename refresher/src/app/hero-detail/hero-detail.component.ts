// import { Location } from '@angular/common'
// import { Component, Input, OnInit } from '@angular/core'
// import { ActivatedRoute } from '@angular/router'
// import { Hero } from '../hero/hero.interface'
// import { HeroService } from '../hero.service'

// @Component({
// 	selector: 'app-hero-detail',
// 	styleUrls: ['./hero-detail.component.sass'],
// 	templateUrl: './hero-detail.component.html',
// })
// export class HeroDetailComponent implements OnInit {
// 	@Input() hero: Hero = {
// 		id: -1,
// 		name: 'default',
// 	}

// 	constructor(
// 		private location: Location,
// 		private route: ActivatedRoute,
// 		private heroService: HeroService,
// 	) {
// 		console.log('[ HeroDetail | ctor ]')
// 		// this.hero = {
// 		// 	id: -1,
// 		// 	name: 'default',
// 		// }
// 	}

// 	goBack(): void {
// 		this.location.back()
// 	}

// 	ngOnInit(): void {
// 		console.log('[ HeroDetail | ngOnInit ]')
// 		this.loadHero()
// 	}

// 	loadHero(): void {
// 		console.log('[ HeroDetail | loadHero ]')
// 		const id = parseInt(this.route.snapshot.paramMap.get('id'), 10)

// 		this.heroService.getHero(id)
// 			.subscribe(h => {
// 				console.log(`[ HeroDetail | loadHero | callback ] h.name="${h.name}"`)
// 				this.hero = h
// 			})
// 	}

// 	save(): void {
// 		this.heroService.updateHero(this.hero)
// 			.subscribe(() => this.goBack())
// 	}
// }
