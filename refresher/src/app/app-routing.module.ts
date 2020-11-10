import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DashboardComponent } from './dashboard/dashboard.component'
import { HeroesComponent } from './heroes/heroes.component'

const routes: Routes = [
	{
		component: DashboardComponent,
		path: 'dashboard',
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
		RouterModule.forRoot(routes),
	],
})
export class AppRoutingModule { }
