import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { CapitalizePipe } from './capitalize.pipe'
import { HeroDetailComponent } from './hero-detail/hero-detail.component'
import { HeroesComponent } from './heroes/heroes.component'
import { MessagesComponent } from './messages/messages.component'

@NgModule({
	bootstrap: [AppComponent],
	declarations: [
		AppComponent,
		HeroesComponent,
		CapitalizePipe,
		HeroDetailComponent,
		MessagesComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
	],
	providers: [],
})
export class AppModule { }
