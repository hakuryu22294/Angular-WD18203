import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ProductService } from '../../services/product/product.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Category } from '../../interface/Category';
import { CategoryService } from '../../services/category/category.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit  {
  form!:FormGroup;
  cateList: Category[] | any[] = []; 
  constructor(
    private productService: ProductService, 
    private cateService: 
    CategoryService, 
    private toastrService:ToastrService, 
    private fb:FormBuilder,
    private router : Router){}
    ngOnInit():void {
    this.getAllCate()
    this.form = this.fb.group({
      title: ['',[Validators.required, Validators.minLength(3)]],
      price: [0, Validators.min(1)],
      description: ['', Validators.required],
      category: ['', Validators.required],
      image:['', Validators.required]
    });
  }



  onSubmit(): void {
    debugger;
   if(this.form.valid){
      this.productService.createPrdAdmin(this.form.value).subscribe((res: any) => {
       if (res) {
         this.toastrService.success('Successfully created', "Success");
         this.router.navigate(['admin/all-products']);
       } else {
         this.toastrService.error('Error creating');
       }
     })
   }else{
    this.toastrService.error('Error creating');
   }
  }

  getAllCate():void{
    this.cateService.getAllCate().subscribe(cates => {
      this.cateList = cates
    })
  }
}
