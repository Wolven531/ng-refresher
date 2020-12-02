import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HeroDetailComponent } from './hero-detail/hero-detail.component'
import { HeroesComponent } from './heroes/heroes.component'

const routes: Routes = [
	{
		children: [
			{
				component: HeroDetailComponent,
				path: 'detail/:id',
			},
			{
				component: HeroesComponent,
				path: 'all',
			},
			{
				path: '',
				redirectTo: 'all',
				pathMatch: 'full',
			},
		],
		// component: HeroesComponent,
		path: 'heroes',
	},
]

@NgModule({
	declarations: [],
	exports: [RouterModule],
	imports: [
		RouterModule.forChild(routes),
	],
})
export class HeroRoutingModule { }
