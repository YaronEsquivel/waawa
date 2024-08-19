import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserRoutingModule } from './create-user-routing.module';
import { CreateUserComponent } from './create-user.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [
    CreateUserComponent
  ],
  imports: [
    CommonModule,
    CreateUserRoutingModule,
    ComponentsModule
  ]
})
export class CreateUserModule { }
