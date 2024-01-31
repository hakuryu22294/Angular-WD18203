import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../../services/category/category.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-update-cate',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-cate.component.html',
  styleUrl: './update-cate.component.css',
})
export class UpdateCateComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl([''], [Validators.required, Validators.minLength(3)]),
    description: new FormControl(['']),
  });

  constructor(
    private toastr: ToastrService,
    private cateService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    const categoryID = +this.route.snapshot.paramMap.get('id')!;
    console.log(categoryID);
    this.cateService.getCategoryByID(categoryID).subscribe((category) => {
      this.form.patchValue({
        name: category.name,
        description: category.description,
      });
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.cateService
        .updateCate(+this.route.snapshot.paramMap.get('id')!, this.form.value)
        .subscribe((res: any) => {
          if (res) {
            this.toastr.success('Successfully update', 'Success');
            this.router.navigate(['admin/all-category']);
          } else {
            this.toastr.error('Error update');
          }
        });
    } else return;
  }
}
