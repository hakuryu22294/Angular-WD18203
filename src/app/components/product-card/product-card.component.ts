import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../interface/Product';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { CurrencyPipe } from '@angular/common';
import { CategoryService } from '../../services/category/category.service';
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [TruncatePipe, CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product | any;
  cateName: string | undefined;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getCategoryNameByID(this.product.categoryID);
  }

  getCategoryNameByID(categoryId: number): void {
    this.categoryService.getCategoryByID(categoryId).subscribe((category: any) => {
      this.cateName = category.name;
    });
  }
}
