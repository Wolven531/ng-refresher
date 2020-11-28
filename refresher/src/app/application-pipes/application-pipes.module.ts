import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { CamelCasePipe } from './camel-case.pipe'
import { CapitalizePipe } from './capitalize.pipe'

@NgModule({
	declarations: [
		CamelCasePipe,
		CapitalizePipe,
	],
	exports: [
		CamelCasePipe,
		CapitalizePipe,
	],
	imports: [
		CommonModule,
	],
})
export class ApplicationPipesModule { }
