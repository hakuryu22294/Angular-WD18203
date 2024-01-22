import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule, FormControl, AbstractControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
    form!: FormGroup;
    constructor(
      private userService: UserService,
      private toastr: ToastrService,
      private fb: FormBuilder,
      private router: Router
    ){}
    ngOnInit(): void {
      this.form = this.fb.group({
        email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)])),
        confirmPassword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)]))
      },
      {
        validators: this.passwordMatchValidator
      });
    }

    passwordMatchValidator(control: AbstractControl){
      return control.get('password')?.value === control.get('confirmPassword')?.value
      ? null : {missmatch:true}
    }

  
    onSubmit(): void {
      const userRegistrationData = {
        email: this.form.get('email')?.value,
        username: this.form.get('username')?.value,
        password: this.form.get('password')?.value,
        role: 'member'
      };
  
      if (this.form.valid) {
        this.userService.register(userRegistrationData.email, userRegistrationData.username, userRegistrationData.password).subscribe((res: any) => {
          if (res) {
            this.toastr.success('Create Successfully');
            this.router.navigate(['/login']);
          }
        });
      } else {
        console.log(this.form.get('confirmPassword')?.touched)
        this.toastr.warning('Please input')
        return;
      }
    }
  }