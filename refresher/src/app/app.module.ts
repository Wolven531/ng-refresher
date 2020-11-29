import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ApplicationPipesModule } from './application-pipes/application-pipes.module'
import { DashboardComponent } from './dashboard/dashboard.component'
import { HeroDetailComponent } from './hero-detail/hero-detail.component'
import { HeroSearchComponent } from './hero-search/hero-search.component'
import { HeroService } from './hero.service'
import { HeroesComponent } from './heroes/heroes.component'
import { InMemoryDataService } from './in-memory-data.service'
import { MessagesComponent } from './messages/messages.component'

// import { HeroModule } from './hero/hero.module'

@NgModule({
	bootstrap: [AppComponent],
	declarations: [
		AppComponent,
		DashboardComponent,
		MessagesComponent,
		HeroDetailComponent,
		HeroSearchComponent,
		HeroesComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		// !!! TODO
		// The HttpClientInMemoryWebApiModule module intercepts HTTP requests
		// and returns simulated server responses;
		// remove it when a server is ready to receive requests
		HttpClientInMemoryWebApiModule.forRoot(
			InMemoryDataService,
			{ dataEncapsulation: false }
		),
		AppRoutingModule,
		ApplicationPipesModule,
		// HeroModule,
	],
	providers: [
		HeroService,
	],
})
export class AppModule { }
