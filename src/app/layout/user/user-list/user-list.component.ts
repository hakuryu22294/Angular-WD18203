import { Component, OnInit } from '@angular/core';
import { User } from '../../../interface/User';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser(): void {
    this.userService.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }
  removeUser(id: string): void {
    const confirmDlt = confirm('Are you sure you want to Delete this user?');
    if (confirmDlt) {
      this.userService.removeUser(id).subscribe((data: any) => {
        if (data) {
          this.getAllUser();
          this.toastr.success(`Deleted ${data.name} successfully`);
        } else {
          this.toastr.error(`Deleted failed`);
        }
      });
    }
  }
}
