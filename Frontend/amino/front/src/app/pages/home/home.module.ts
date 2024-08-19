import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    TranslateModule.forChild({
      extend: true,
    }),
    MatButtonModule,
  ],
})
export class HomeModule {}
