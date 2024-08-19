import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/http/users.model';
import { DataService } from 'src/app/services/data.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'age',
    'phone',
    'actions'
  ];
  data: User[] = [];
  constructor(private usersService: UsersService, private dataService: DataService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.usersService.getUsers().subscribe((users) => {
      this.data = users;
    },
      (err) => {
        this.dataService.setGeneralNotificationMessage(err);
      });
  }

  deleteUser(id: number): void {
    this.usersService.deleteUser(id).subscribe(() => {
      this.data = this.data.filter(user => user.id !== id);
    }, (err) => {
      this.dataService.setGeneralNotificationMessage(err);
    });
  }
}
