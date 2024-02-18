import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../../interface/User';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css',
})
export class UpdateUserComponent {
  form: FormGroup = new FormGroup({});
  user: User = {
    username: '',
    email: '',
    password: '',
    role: '',
    address: '',
    tel: 0,
  };
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: [
        this.user.username,
        [Validators.required, Validators.minLength(3)],
      ],
      email: [
        { value: this.user.email, disabled: true },
        [Validators.required, Validators.email],
      ],
      address: [this.user.address, [Validators.required]],
      tel: [
        this.user.tel,
        [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
      ],
    });
  }
  ngOnInit(): void {
    const userID = this.route.snapshot.paramMap.get('id');
    if (userID) {
      this.userService.getUserById(userID).subscribe((user: any) => {
        this.form.patchValue({
          username: user.username,
          email: user.email,
          address: user.address,
          tel: user.tel,
        });
      });
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const userUpdate = this.form.value;
      const userID = this.route.snapshot.paramMap.get('id')!;
      this.userService.updateUser(userID, userUpdate).subscribe((res: any) => {
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
