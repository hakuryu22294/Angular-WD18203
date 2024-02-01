import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './update-info.component.html',
  styleUrl: './update-info.component.css',
})
export class UpdateInfoComponent implements OnInit {
  userID: string = this.route.snapshot.paramMap.get('id')!;
  form: FormGroup = new FormGroup({
    username: new FormControl(
      [''],
      [Validators.required, Validators.minLength(3)]
    ),
    email: new FormControl({ value: '', disabled: true }),
    tel: new FormControl(
      [''],
      [Validators.required, Validators.pattern('[0-9]*')]
    ),
    address: new FormControl(['']),
  });

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    const userID = this.route.snapshot.paramMap.get('id')!;
    this.userService.getUserById(userID).subscribe((user: any) => {
      this.form.patchValue({
        email: user.email,
        username: user.username,
        tel: user.tel,
        address: user.address,
      });
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.userService
        .updateUser(this.route.snapshot.paramMap.get('id')!, this.form.value)
        .subscribe((user: any) => {
          if (user) {
            this.toastr.success('Successfully update', 'Success');
            this.router.navigate([`/user/${user.id}`]);
          } else {
            this.toastr.error('Error updating');
          }
        });
    } else return;
  }
}
