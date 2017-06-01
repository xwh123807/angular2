import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CrisisModule } from './crisis-center/crisis.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeroSearchComponent } from './heroes/hero-search/hero-search.component';
import { HeroesModule } from './heroes/heroes.module';
import { InMemoryDataService } from './heroes/in-memory-data.service';
import { ComposeMessageComponent } from './compose-message/compose-message.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ComposeMessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // <!--import the FormsModule before binding with [(ngModel)]
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    HeroesModule,
    CrisisModule,
    AppRoutingModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
