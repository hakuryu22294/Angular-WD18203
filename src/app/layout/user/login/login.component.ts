import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { User } from '../../../interface/User';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  userInfo!: User;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.email])
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(8)])
      ),
    });
  }
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.userService
        .login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe(
          (response: any) => {
            if (response) {
              sessionStorage.setItem('token', `${response.accessToken}`);
              sessionStorage.setItem('role', `${response.user.role}`);
              sessionStorage.setItem('id', `${response.user.id}`);
              this.toastr.success('Login successful');
              this.router.navigate([`user/${response.user.id}`]);
            } else {
              this.toastr.error('Email or password is incorrect');
            }
          },
          (error: any) => {
            this.toastr.error(error.message);
          }
        );
    } else {
      return;
    }
  }
}
