import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { CapitalizePipe } from './capitalize.pipe'

@NgModule({
	declarations: [
		CapitalizePipe,
	],
	exports: [
		CapitalizePipe,
	],
	imports: [
		CommonModule,
	],
})
export class ApplicationPipesModule { }
