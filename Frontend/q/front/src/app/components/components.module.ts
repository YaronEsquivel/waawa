import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersFormComponent } from './users-form/users-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ChartComponent } from './chart/chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';



@NgModule({
  declarations: [
    UsersFormComponent,
    ChartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    NgApexchartsModule
  ],
  exports: [
    UsersFormComponent,
    ChartComponent
  ]
})
export class ComponentsModule { }
