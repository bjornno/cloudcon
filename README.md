# State Management Learning Project
Used to demonstrate some aspects of state management for a talk.

Showing 3 approaches using ngrx, ngrx Component Store and custom Service with a Subject.
Edit app.module.ts#48 to switch between the different approaches.

The project was built with Angular CLI.

nvm install 18.10.2 &
npm install -g @angular/cli &
npm install &
ng serve

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Backend server
It also consists of a small backend express server module in server/. node index.js to start.
If you want to test with backend server switch the DeviceService in app.module.ts#49 to RemoteDeviceService

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
