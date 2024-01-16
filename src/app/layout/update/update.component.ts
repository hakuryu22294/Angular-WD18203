import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product/product.service';
import { ActivatedRoute,Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category/category.service';
import { Category } from '../../interface/Category';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit {
  form!: FormGroup;
  cateList: Category[] | any[] = [];
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private router: Router,
    private cateService: CategoryService
  ) {}
  ngOnInit(): void {
    this.getAllCate();

    this.form = this.fb.group({
      id:[0],
      title: ['', [Validators.required, Validators.minLength(3)]], 
      price: [0, Validators.min(1)],
      description: ['', Validators.required],
      category: ['', Validators.required],
      image: ['', Validators.required],
    });
    this.route.params.subscribe(params => {
      const productId = params['id'];
      this.productService.getProductById(productId).subscribe(product => {
        this.form.patchValue(product);
        this.form.get('category')?.setValue(product.category);
      });
    });
  }
  onSubmit(): void {
    if (this.form.valid) {
      const productId = this.form.get('id')?.value;
      this.productService.updatePrdAdmin(productId,this.form.value).subscribe(res => {
        if (res) {
          this.toastrService.success('Product updated successfully', 'Success');
          this.router.navigate(['admin/all-products']);
        } else {
          this.toastrService.error('Error updating product');
        }
      });
    } else {
      this.toastrService.error('Please fill in all required fields');
    }
  }
  getAllCate():void{
    this.cateService.getAllCate().subscribe(cates => {
      this.cateList = cates
    })
  }
}
