import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent }  from './app.component';
import { NotificationPanelComponent }  from './notification-panel/notification-panel.component';
import { NotificationComponent }  from './notifications/notification.component';
import { HomeComponent }  from './home/home.component';

import { SmallFontDirective } from './directives/small-font';
import { HighlightDirective } from './directives/highlight';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, MaterialModule ],
  declarations: [ AppComponent,
                  NotificationPanelComponent,
                  NotificationComponent,
                  HomeComponent,
                  SmallFontDirective,
                  HighlightDirective ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
