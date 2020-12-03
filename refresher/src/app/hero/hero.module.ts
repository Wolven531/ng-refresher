import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
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
		CommonModule, // required in all modules that are not app (which uses BrowserModule)
		FormsModule, // required so that ngModel is available to components
		ApplicationPipesModule, // required to provide custom pipes to components
		HeroRoutingModule, // required to handle routing within module
	],
})
export class HeroModule { }
