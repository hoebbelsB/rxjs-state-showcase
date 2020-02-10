import { CompilerOptions, enableProdMode, NgZone } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const compilerOptions: any = !environment.zonefull ? {
        ngZone: 'noop'
    } : {};

platformBrowserDynamic().bootstrapModule(AppModule, compilerOptions)
  .catch(err => console.error(err));
