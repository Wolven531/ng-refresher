import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HeroesComponent } from './heroes/heroes.component'

const routes: Routes = [
	{
		component: HeroesComponent,
		path: 'heroes',
	},
]

@NgModule({
	declarations: [],
	exports: [RouterModule],
	imports: [
		RouterModule.forRoot(routes),
	],
})
export class AppRoutingModule { }
