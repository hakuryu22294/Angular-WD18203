import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  submited: boolean = false;
  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group(
      {
        email: [
          '',
          Validators.compose([Validators.required, Validators.email]),
          [this.validateDuplicateEmail.bind(this)],
        ],
        username: ['', Validators.required],
        password: [
          '',
          Validators.compose([Validators.required, Validators.minLength(8)]),
        ],
        confirmPassword: [
          '',
          Validators.compose([Validators.required, Validators.minLength(8)]),
        ],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }
  ngOnInit(): void {}

  passwordMatchValidator(control: AbstractControl) {
    return control.get('password')?.value ===
      control.get('confirmPassword')?.value
      ? null
      : { missmatch: true };
  }

  validateDuplicateEmail(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return this.userService.checkEmail(control.value).pipe(
      map((user: any) => {
        return user ? { duplicateEmail: true } : null;
      })
    );
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { email, username, password } = this.form.value;
      this.userService
        .register(email, username, password, 'admin')
        .subscribe((res: any) => {
          if (res) {
            this.toastr.success('Create Successfully');
            this.router.navigate(['/login']);
          }
        });
    } else {
      console.log(this.form.get('confirmPassword')?.touched);
      this.toastr.warning('Please input');
      return;
    }
  }
}
