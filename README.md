# ng-refresher

## Notes

* If running in PowerShell, make sure to set the Execution Policy appropriately
	* More info [here](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7#powershell-execution-policies)
	* I used `Set-ExecutionPolicy -ExecutionPolicy Unrestricted -Scope LocalMachine`
* To bootstrap the boilerplate code, I used `ng new refresher`
* To add routing, `ng generate module app-routing --flat --module=app` ([more info](https://angular.io/tutorial/toh-pt5#add-the-approutingmodule))
	* `--flat` puts the file in `src/app` instead of its own folder
	* `--module=app` tells the CLI to register it in the imports array of the **App**Module

## Running

* Run `npm start` to compile the code, start the webapp (locally), and launch the system default browser to the webapp's location
* Run `npm run start:headless` to compile the code and start the webapp (locally)

## Testing

* Run `npm test` to run all tests while developing and re-execute on code change
* Run `npm run test-cc` to run tests with code coverage collection
