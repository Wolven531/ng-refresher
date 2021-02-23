import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DashboardComponent } from './dashboard/dashboard.component'
import { GameComponent } from './game/game.component'

const routes: Routes = [
	{
		component: DashboardComponent,
		path: 'dashboard',
	},
	{
		component: GameComponent,
		path: 'game',
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
