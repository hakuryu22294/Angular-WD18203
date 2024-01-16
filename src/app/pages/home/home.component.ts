import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductService } from '../../services/product/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,ProductCardComponent,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {  
  prdList = []
  constructor(private product:ProductService){}
  ngOnInit(){
    this.fetchData();
  }
  fetchData(){
    this.product.getData().subscribe((data:any) => {
      this.prdList = data
    })
  }
}
