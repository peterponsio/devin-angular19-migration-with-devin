import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

/**
 * main.ts — Angular 19 (MIGRAR en Angular 21)
 *
 * Punto de entrada de la aplicación usando el bootstrap clásico
 * basado en NgModule.
 *
 * OBJETIVO DE MIGRACIÓN (Angular 21):
 *   Reemplazar por bootstrapApplication() sin NgModule:
 *
 *   import { bootstrapApplication } from '@angular/platform-browser';
 *   import { provideRouter } from '@angular/router';
 *   import { provideHttpClient } from '@angular/common/http';
 *   import { provideAnimations } from '@angular/platform-browser/animations';
 *   import { AppComponent } from './app/app.component';
 *   import { routes } from './app/app.routes';
 *
 *   bootstrapApplication(AppComponent, {
 *     providers: [
 *       provideRouter(routes),
 *       provideHttpClient(),
 *       provideAnimations(),
 *     ],
 *   }).catch(err => console.error(err));
 */
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
