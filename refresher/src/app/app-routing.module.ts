import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DashboardComponent } from './dashboard/dashboard.component'
import { HeroDetailComponent } from './hero/hero-detail/hero-detail.component'
import { HeroesComponent } from './hero/heroes/heroes.component'

// TODO - Nov 18, 2020 - extract hero related routes to Hero module
const routes: Routes = [
	{
		component: DashboardComponent,
		path: 'dashboard',
	},
	{
		component: HeroDetailComponent,
		path: 'detail/:id',
	},
	{
		component: HeroesComponent,
		path: 'heroes',
	},
	{
		path: '',
		redirectTo: '/dashboard',
		pathMatch: 'full',
	},
]

@NgModule({
	declarations: [],
	exports: [RouterModule],
	imports: [
		RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
	],
})
export class AppRoutingModule { }
