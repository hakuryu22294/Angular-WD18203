import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  constructor(
    protected userService: UserService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}
  userID!: string;

  ngOnInit(): void {
    this.getIdUserLogin();
  }

  getIdUserLogin() {
    if (this.userService.isLoggedIn()) {
      this.userID = JSON.parse(sessionStorage.getItem('id') || '');
      console.log('this.userID: ', this.userID);
    }
  }

  logOut() {
    sessionStorage.clear();
    this.toastr.success('Logout Successfully');
  }
}
