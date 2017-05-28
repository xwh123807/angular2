import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { Step7Component } from './step7/step7.component';
import { Step72Component } from './step7-2/step7-2.component';
import { Step73Component } from './step7-3/step7-3.component';
import { Step74Component } from './step7-4/step7-4.component';
import { Step8Component } from './step8/step8.component';
import { Step9Component } from './step9/step9.component';
import { HeroListComponent } from './step9/hero-list.component';
import { HeroService } from './step9/hero.service';
import { HerosComponent } from './step9/heros.component';
import { LoggerService } from './step9/logger.service';

@NgModule({
  declarations: [
    AppComponent,
    Step7Component,
    Step72Component,
    Step73Component,
    Step74Component,
    Step8Component,
    Step9Component,
    HeroListComponent,
    HerosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    HeroService,
    LoggerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
