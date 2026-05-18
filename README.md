# softtek-shop — Proyecto de migración Angular 19 → 21

Aplicación de catálogo de productos construida con **Angular 19** siguiendo patrones que
necesitan actualizarse para Angular 21. Este repositorio se usa como base para practicar
la migración con Devin AI.

---

## 🎯 Objetivos de migración

Este proyecto contiene intencionalmente los siguientes patrones de Angular 19
que deben migrarse a Angular 21:

### 1. NgModules → Standalone Components
Todos los módulos (`AppModule`, `ProductsModule`, `CartModule`, `CoreModule`, `SharedModule`)
deben convertirse a componentes standalone con sus propios imports.

**Ficheros afectados:**
- `src/app/app.module.ts` → eliminar, convertir `AppComponent`
- `src/app/app-routing.module.ts` → migrar a `provideRouter()`
- `src/app/core/core.module.ts` → eliminar
- `src/app/shared/shared.module.ts` → eliminar
- `src/app/features/products/products.module.ts` → eliminar
- `src/app/features/cart/cart.module.ts` → eliminar

### 2. Directivas estructurales → Nueva sintaxis de control flow
Las plantillas HTML usan `*ngIf`, `*ngFor` y `*ngSwitch` que deben migrarse
a la nueva sintaxis `@if`, `@for` y `@switch`.

**Ficheros afectados:**
- `src/app/app.component.html`
- `src/app/features/products/product-list/product-list.component.html`
- `src/app/features/products/product-detail/product-detail.component.html`
- `src/app/features/cart/cart/cart.component.html`
- `src/app/features/cart/checkout/checkout.component.html`
- `src/app/shared/components/notification/notification.component.html`

### 3. BehaviorSubject → Signals
Los servicios usan `BehaviorSubject` de RxJS para el estado reactivo.
En Angular 21, el patrón recomendado es usar `signal()` y `computed()`.

**Ficheros afectados:**
- `src/app/core/services/cart.service.ts` — estado del carrito
- `src/app/core/services/auth.service.ts` — estado del usuario

---

## 🏗️ Arquitectura del proyecto

```
src/app/
├── app.module.ts            # NgModule raíz (MIGRAR → standalone)
├── app-routing.module.ts    # RouterModule.forRoot() (MIGRAR → provideRouter)
├── app.component.ts/.html   # *ngIf en navbar (MIGRAR → @if)
│
├── core/
│   ├── core.module.ts       # NgModule de servicios singleton (ELIMINAR)
│   └── services/
│       ├── product.service.ts   # HttpClient, Observable — OK en v21
│       ├── cart.service.ts      # BehaviorSubject (MIGRAR → signal)
│       └── auth.service.ts      # BehaviorSubject (MIGRAR → signal)
│   └── guards/
│       └── auth.guard.ts        # CanActivate clase (MIGRAR → funcional)
│
├── shared/
│   ├── shared.module.ts     # NgModule compartido (ELIMINAR)
│   ├── components/
│   │   ├── loading-spinner/ # Componente simple (MIGRAR → standalone)
│   │   └── notification/    # *ngSwitch (MIGRAR → @switch)
│   └── pipes/
│       └── currency-eur.pipe.ts  # Pipe personalizado
│
├── features/
│   ├── products/
│   │   ├── products.module.ts        # FeatureModule (ELIMINAR)
│   │   ├── product-list/             # *ngFor + *ngIf (MIGRAR)
│   │   └── product-detail/           # *ngSwitch estado (MIGRAR)
│   └── cart/
│       ├── cart.module.ts            # FeatureModule (ELIMINAR)
│       ├── cart/                     # *ngFor + subscribe (MIGRAR)
│       └── checkout/                 # *ngIf múltiple (MIGRAR)
│
└── models/
    ├── product.model.ts
    └── cart.model.ts
```

---

## 🚀 Arrancar el proyecto

```bash
npm install
ng serve
```

La aplicación arranca en `http://localhost:4200`.

---

## 💡 Preguntas sugeridas para Ask Devin

```
1. "What NgModules does this project have and what is the migration
   strategy to convert them all to standalone components in Angular 21?"

2. "Find all uses of *ngIf and *ngFor in the templates and show me
   how to migrate each one to the new @if/@for control flow syntax."

3. "The cart.service.ts uses BehaviorSubject. How would I rewrite
   this service using Angular 21 signals instead of RxJS?"

4. "What is the impact of removing AppModule? Which components,
   services and guards would need to be updated?"

5. "Generate a migration plan ordered by risk and effort for
   upgrading this Angular 19 app to Angular 21."
```

---

## 📋 Checklist de migración

- [ ] Convertir `AppComponent` a standalone
- [ ] Migrar routing a `provideRouter()` en `main.ts`
- [ ] Convertir `LoadingSpinnerComponent` a standalone
- [ ] Convertir `NotificationComponent` a standalone
- [ ] Migrar templates de `product-list` a `@if`/`@for`
- [ ] Migrar templates de `product-detail` a `@switch`
- [ ] Migrar templates de `cart` a `@for`
- [ ] Migrar templates de `checkout` a `@if`
- [ ] Reescribir `cart.service.ts` con signals
- [ ] Reescribir `auth.service.ts` con signals
- [ ] Migrar `auth.guard.ts` a guard funcional
- [ ] Eliminar todos los NgModules
- [ ] Actualizar `main.ts` a `bootstrapApplication()`
- [ ] Ejecutar `ng update @angular/core@21`
# devin-angular19-migration-with-devin
