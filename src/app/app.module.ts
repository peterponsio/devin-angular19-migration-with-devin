import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

/**
 * AppModule — Angular 19 (ELIMINAR en Angular 21)
 *
 * Módulo raíz de la aplicación. Bootstrapea AppComponent y
 * configura los módulos globales: Browser, Routing y Core.
 *
 * OBJETIVO DE MIGRACIÓN (Angular 21):
 *   - Eliminar AppModule por completo.
 *   - Migrar src/main.ts a bootstrapApplication():
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
 *   });
 */
@NgModule({
  declarations: [
    AppComponent, // MIGRAR → standalone: true
  ],
  imports: [
    BrowserModule,           // MIGRAR → provideAnimations() en main.ts
    BrowserAnimationsModule, // MIGRAR → provideAnimations()
    AppRoutingModule,        // MIGRAR → provideRouter(routes)
    CoreModule,              // MIGRAR → provideHttpClient() en main.ts
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
