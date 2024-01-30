import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
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
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  userInfo!: User;
  constructor(
    private fb:FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ){}
  ngOnInit(): void {
      this.loginForm = this.fb.group({
        email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
        password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)]))
      });
  }
  onSubmit(): void {
    if (this.loginForm.valid) {
      const res = this.userService.getByEmail(this.loginForm.value.email);
      console.log(res);
      res.subscribe(
        (res: any) => {
          try {
            this.userInfo = res;
            console.log(this.userInfo);
            if (this.userInfo.password === this.loginForm.value.password) {
              sessionStorage.setItem('id', `${this.userInfo.id}`);
              sessionStorage.setItem('role', `${this.userInfo.role}`);
              this.toastr.success('Login successful');
              this.router.navigate(['']);
            } else {
              this.toastr.error('Password is incorrect');
            }
          } catch (err: any) {
            this.toastr.error(err.message);
          }
        },
        (error: any) => {
          this.toastr.error(error.message);
        }
      );
    }
  }
}
