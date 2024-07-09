// app/users/users-table/users-table.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../../models/user';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [
    MatTableModule,
  ],
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {
  users: User[] = [];
  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = ['id', 'name', 'email'];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data.users;
        console.log(this.users); 
        this.dataSource = new MatTableDataSource(data.users); 
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }
}
