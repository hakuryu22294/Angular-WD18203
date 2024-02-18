import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { User } from '../../../interface/User';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css',
})
export class CreateUserComponent {
  form: FormGroup = new FormGroup({});
  user: User = {
    username: '',
    email: '',
    password: '',
    role: '',
  };
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private userService: UserService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      username: [
        this.user.username,
        [Validators.required, Validators.minLength(3)],
      ],
      email: [this.user.email, [Validators.required, Validators.email]],
      password: [
        this.user.password,
        [Validators.required, Validators.minLength(6)],
      ],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { username, email, password } = this.form.value;
      const role = 'member';
      this.userService
        .register(email, username, password, role)
        .subscribe((res: any) => {
          if (res) {
            this.toastr.success('Successfully created', 'Success');
            this.router.navigate(['admin/all-users']);
          } else {
            this.toastr.error('Error creating');
          }
        });
    } else {
      this.toastr.error('Error creating');
    }
  }
}
