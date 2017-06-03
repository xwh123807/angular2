import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
@NgModule({
  imports: [
    LoginRoutingModule
  ],
  declarations: [
    LoginComponent
  ],
  exports: [],
  providers: []
})

export class LoginModule { }
