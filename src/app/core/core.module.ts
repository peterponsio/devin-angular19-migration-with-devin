import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

/**
 * CoreModule — Angular 19 (ELIMINAR en Angular 21)
 *
 * Patrón clásico: módulo singleton que agrupa servicios globales.
 * Se importa UNA SOLA VEZ en AppModule (guard incluido).
 *
 * OBJETIVO DE MIGRACIÓN (Angular 21):
 *   - Eliminar este módulo por completo.
 *   - Los servicios con providedIn:'root' ya son globales sin necesidad de un módulo.
 *   - HttpClient pasa a provideHttpClient() en la función bootstrapApplication().
 *
 * Ejemplo migración en main.ts:
 *   bootstrapApplication(AppComponent, {
 *     providers: [
 *       provideHttpClient(),
 *       provideRouter(routes),
 *       ...
 *     ]
 *   });
 */
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule, // MIGRAR → provideHttpClient()
  ],
  // No declara componentes: solo agrupa servicios y configuración
})
export class CoreModule {
  /**
   * Guard que evita importar CoreModule más de una vez.
   * No tiene equivalente en el patrón standalone (no es necesario).
   */
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule ya está cargado. Impórtalo solo en AppModule.'
      );
    }
  }
}
