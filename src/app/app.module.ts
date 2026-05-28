import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

/**
 * AppModule — DEPRECATED (ya no se usa tras la migración de main.ts)
 *
 * El bootstrap de la aplicación ahora usa bootstrapApplication() en main.ts.
 * Este módulo se conserva temporalmente hasta que todos los feature modules
 * se migren a standalone components.
 */
@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
  ],
  providers: [],
})
export class AppModule {}
