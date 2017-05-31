import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CrisisModule } from './crisis-center/crisis.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeroSearchComponent } from './heroes/hero-search/hero-search.component';
import { HeroesModule } from './heroes/heroes.module';
import { InMemoryDataService } from './heroes/in-memory-data.service';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
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
