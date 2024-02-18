import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../interface/Product';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../services/category/category.service';
import { Observable, map } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    TruncatePipe,
    CurrencyPipe,
    CommonModule,
    RouterLink,
    FormsModule,
    MatAutocompleteModule,
    NgxPaginationModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  searchKeyword: string = '';
  searchResults: any[] = [];
  tempArr: any[] = [];
  categorySelected: number = 0;
  prdList: Product[] | any = [];
  categoryNames: { [key: number]: string } = {};
  categoryList: any[] = [];
  p: number = 1;
  itemsPerPage: number = 5;
  totalProduct: any;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    protected toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    const storedCategories = localStorage.getItem('categoryList');
    this.route.queryParams.subscribe((params) => {
      const filter = params['filter'];
      const search = params['search'];
      if (filter && filter !== '') {
        this.categoryList = JSON.parse(storedCategories || '[]');
        this.categorySelected = parseInt(filter, 10);
        this.filterProductsByCategory(this.categorySelected);
      } else if (search && search.length > 0) {
        this.searchKeyword = search;
        this.onSearchChange();
      } else {
        this.getAllPrdAndCategories();
      }
    });
  }

  getAllPrdAndCategories(): void {
    this.productService.getPrdAdmin().subscribe((products: any[]) => {
      this.prdList = products;
      this.tempArr = [...this.prdList];
      this.totalProduct = this.prdList.length;
    });
    this.categoryService.getAllCate().subscribe((categories: any[]) => {
      const categoryNames: { [key: number]: string } = {};
      categories.forEach((category: any) => {
        categoryNames[category.id] = category.name;
      });
      this.categoryNames = categoryNames;
      this.categoryList = categories;
      localStorage.setItem('categoryList', JSON.stringify(this.categoryList));
    });
  }

  onCategorySelected(categoryId: number): void {
    this.categorySelected = categoryId;
    this.filterProductsByCategory(categoryId);
  }

  getCategoryNameByID(categoryId: number): Observable<string> {
    return this.categoryService
      .getCategoryByID(categoryId)
      .pipe(map((category: any) => category.name));
  }

  delettePrd(id: string) {
    const isDelete = window.confirm('Are you sure you want to delete');
    if (isDelete) {
      this.productService.deletePrdAdmin(id).subscribe(() => {
        this.toastrService.success('Deleted-successfully', 'Success');
        this.getAllPrdAndCategories;
      });
    } else {
      this.toastrService.error('Delete is cancel', 'Error');
    }
  }

  filterProductsByCategory(categoryId: number): void {
    this.productService.getPrdAdmin().subscribe((data: any) => {
      this.tempArr = data.filter(
        (prd: any) => Number(prd.categoryID) == categoryId
      );
      this.totalProduct = this.tempArr.length;
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { filter: categoryId },
      });
    });
  }

  onSearchChange(): void {
    if (this.searchKeyword.trim() !== '') {
      this.searchResults = this.prdList.filter((prd: any) =>
        prd.title.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
    } else {
      this.tempArr = [...this.prdList];
    }
    this.tempArr = this.searchResults;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: this.searchKeyword },
    });
  }
}
