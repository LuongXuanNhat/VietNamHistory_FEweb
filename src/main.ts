import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'hammerjs';

import { AppModule } from './app/app.module';
import { CountdownService } from './app/service/countdown-service.service';
declare global {
  interface Window {
    countdownService: CountdownService;
  }
}
window.countdownService = new CountdownService();
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
