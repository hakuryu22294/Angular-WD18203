import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductItemComponent } from '../../components/product-item/product-item.component';
import { CommonModule } from '@angular/common';

import { ProductService } from '../product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,HeaderComponent,FooterComponent,ProductItemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  prdList = []
  constructor(private product:ProductService){
    this.product.getData().subscribe(data => {
      this.prdList = data
      console.log(this.prdList)
    })
  }
}
