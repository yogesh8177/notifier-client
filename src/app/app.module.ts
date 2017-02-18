import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent }  from './app.component';
import { NotificationPanelComponent }  from './notification-panel/notification-panel.component';
import { NotificationComponent }  from './notifications/notification.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule ],
  declarations: [ AppComponent, NotificationPanelComponent, NotificationComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
