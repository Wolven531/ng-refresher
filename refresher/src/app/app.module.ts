import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ApplicationPipesModule } from './application-pipes/application-pipes.module'
import { DashboardComponent } from './dashboard/dashboard.component'
import { HeroService } from './hero.service'
import { HeroModule } from './hero/hero.module'
import { InMemoryDataService } from './in-memory-data.service'
import { MessagesComponent } from './messages/messages.component';
import { GameComponent } from './game/game.component'

@NgModule({
	bootstrap: [AppComponent],
	declarations: [
		AppComponent,
		DashboardComponent,
		MessagesComponent,
		GameComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
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
		HeroModule,
	],
	providers: [
		HeroService,
	],
})
export class AppModule { }
