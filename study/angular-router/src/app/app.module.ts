import { AdminModule } from './admin/admin-module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CrisisCenterModule } from './crisis-center/crisis-center.module';
import { HeroesModule } from './heroes/heroes.module';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';
import { ComposeMessageComponent } from './compose-message/compose-message.component';
import { LoginModule } from './login/login.module';
import { AuthGuardService } from './security/auth-guard.service';
import { AuthService } from './security/auth.service';
import { DialogService } from './utils/dialog.service';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    ComposeMessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HeroesModule,
    CrisisCenterModule,
    AdminModule,
    LoginModule,
    AppRoutingModule
  ],
  providers: [
    DialogService,
    AuthGuardService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
