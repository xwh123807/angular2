
import { CrisisCenterRoutingModule } from './crisis-center-routing.module';
import { CrisisService } from './crisis.service';
import { NgModule } from '@angular/core';
import { CrisisListComponent } from './crisis-list/crisis-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CrisisCenterComponent } from './crisis-center.component';
import { CrisisDetailComponent } from './crisis-detail/crisis-detail.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CrisisCenterRoutingModule
  ],
  declarations: [
    CrisisListComponent,
    CrisisCenterComponent,
    CrisisDetailComponent
  ],
  providers: [
    CrisisService
  ]
})

export class CrisisCenterModule {

}
