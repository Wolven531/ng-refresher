import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
// import { CapitalizePipe } from '../capitalize.pipe'
import { MessageService } from '../message.service'
import { HeroDetailComponent } from './hero-detail/hero-detail.component'
import { HeroSearchComponent } from './hero-search/hero-search.component'
import { HeroService } from './hero.service'
import { HeroesComponent } from './heroes/heroes.component'

@NgModule({
	declarations: [ // declare Components to make them available in this module
		HeroesComponent,
		HeroDetailComponent,
		HeroSearchComponent,
	],
	exports: [ // export Components for re-use in other modules
		HeroesComponent,
		HeroDetailComponent,
		HeroSearchComponent,
	],
	imports: [ // import BrowserModule once, CommonModule everywhere else
		CommonModule,
	],
	providers: [ // provide services or pipes needed within this module
		MessageService,
		HeroService,
		// TODO - Nov 18, 2020 - make the captialize pipe available for the hero module
		// CapitalizePipe,
	],
})
export class HeroModule { }
