import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { CapitalizePipe } from './capitalize.pipe'
import { DashboardComponent } from './dashboard/dashboard.component'
import { HeroDetailComponent } from './hero-detail/hero-detail.component'
import { HeroesComponent } from './heroes/heroes.component'
import { InMemoryDataService } from './in-memory-data.service'
import { MessagesComponent } from './messages/messages.component'

@NgModule({
	bootstrap: [AppComponent],
	declarations: [
		AppComponent,
		HeroesComponent,
		CapitalizePipe,
		HeroDetailComponent,
		MessagesComponent,
		DashboardComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		HttpClientModule,
		// !!! TODO
		// The HttpClientInMemoryWebApiModule module intercepts HTTP requests
		// and returns simulated server responses;
		// remove it when a server is ready to receive requests
		HttpClientInMemoryWebApiModule.forRoot(
			InMemoryDataService,
			{ dataEncapsulation: false }
		),
	],
	providers: [],
})
export class AppModule { }
