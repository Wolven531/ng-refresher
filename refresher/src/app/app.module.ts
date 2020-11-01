import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { HeroesComponent } from './heroes/heroes.component'

@NgModule({
	bootstrap: [AppComponent],
	declarations: [
		AppComponent,
		HeroesComponent,
	],
	imports: [
		BrowserModule,
	],
	providers: [],
})
export class AppModule { }
