import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../../services/category/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-cate',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-cate.component.html',
  styleUrl: './create-cate.component.css',
})
export class CreateCateComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private cateService: CategoryService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.cateService.createCate(this.form.value).subscribe((res: any) => {
        if (res) {
          this.toastr.success('Successfully created', 'Success');
          this.router.navigate(['admin/all-category']);
        } else {
          this.toastr.error('Error creating');
        }
      });
    } else {
      this.toastr.error('Error creating');
    }
  }
}
