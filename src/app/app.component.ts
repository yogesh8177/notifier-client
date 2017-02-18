import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<h1>Hello {{name}}</h1>
              <notification-panel></notification-panel>`,
})
export class AppComponent  { name = 'Notifier App'; }
