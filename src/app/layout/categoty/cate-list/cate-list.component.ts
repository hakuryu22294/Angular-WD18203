import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category/category.service';
import { Category } from '../../../interface/Category';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../../services/product/product.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cate-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cate-list.component.html',
  styleUrl: './cate-list.component.css',
})
export class CateListComponent implements OnInit {
  cateList: Category[] | any[] = [];
  productCounts: { [key: number]: number } = {};

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.categoryService.getAllCate().subscribe((categories: any) => {
      this.cateList = categories;
      this.calculateProductCounts();
    });
  }

  calculateProductCounts(): void {
    this.productService.getData().subscribe((products: any) => {
      products.forEach((product: any) => {
        if (!this.productCounts[product.categoryID]) {
          this.productCounts[product.categoryID] = 1;
        } else {
          this.productCounts[product.categoryID]++;
        }
      });
    });
  }
  deleteCategory(categoryID: any): void {
    const checkProduct = this.productCounts[categoryID];
    if (checkProduct > 0) {
      this.toastr.error('Cannot delete this category because it has products.');
      return;
    }
    this.categoryService.deleteCate(categoryID).subscribe(() => {
      this.toastr.success('Category deleted successfully.');
      this.getAllCategories();
    });
  }
}
