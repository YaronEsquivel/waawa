import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicUser, User } from 'src/app/model/http/users.model';
import { DataService } from 'src/app/services/data.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {

  constructor(
    private userService: UsersService,
    private dataService: DataService,
    private router: Router) { }


  createUser(user: BasicUser): void {
    this.userService.createUser(user).subscribe(res => {
      this.router.navigate(['users']);
    }, error => this.dataService.setGeneralNotificationMessage(error));
  }
}
