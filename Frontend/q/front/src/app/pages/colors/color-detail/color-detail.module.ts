import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColorDetailRoutingModule } from './color-detail-routing.module';
import { ColorDetailComponent } from './color-detail.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [ColorDetailComponent],
  imports: [
    CommonModule,
    ColorDetailRoutingModule,
    TranslateModule.forChild({
      extend: true,
    }),
    MatListModule,
  ],
})
export class ColorDetailModule {}
