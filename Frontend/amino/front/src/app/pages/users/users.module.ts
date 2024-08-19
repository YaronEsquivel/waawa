import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    TranslateModule.forChild({
      extend: true,
    }),
    MatTableModule,
    MatIconModule,
    MatButtonModule,
  ]
})
export class UsersModule { }
