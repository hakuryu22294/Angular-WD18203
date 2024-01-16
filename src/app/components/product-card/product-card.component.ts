import { Component, Input } from '@angular/core';
import { Product } from '../../interface/Product';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [TruncatePipe, CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!:Product | any;
}
