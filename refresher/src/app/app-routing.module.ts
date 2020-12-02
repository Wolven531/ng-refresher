import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DashboardComponent } from './dashboard/dashboard.component'

const routes: Routes = [
	{
		component: DashboardComponent,
		path: 'dashboard',
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
