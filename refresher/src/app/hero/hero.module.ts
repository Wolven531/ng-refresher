import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ApplicationPipesModule } from '../application-pipes/application-pipes.module'
import { HeroDetailComponent } from './hero-detail/hero-detail.component'
import { HeroRoutingModule } from './hero-routing.module'
import { HeroSearchComponent } from './hero-search/hero-search.component'
import { HeroesComponent } from './heroes/heroes.component'

@NgModule({
	declarations: [
		HeroDetailComponent,
		HeroesComponent,
		HeroSearchComponent,
	],
	exports: [
		HeroSearchComponent, // need to export since app-hero-search is used in some template
	],
	imports: [
		CommonModule,
		ApplicationPipesModule,
		HeroRoutingModule,
	],
})
export class HeroModule { }
