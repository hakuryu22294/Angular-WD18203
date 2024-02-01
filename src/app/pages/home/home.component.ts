import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductService } from '../../services/product/product.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ProductCardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  prdList = [];
  constructor(
    private product: ProductService,
    private userService: UserService,
    private router: Router
  ) {}
  ngOnInit() {
    if (typeof sessionStorage !== 'undefined') {
      if (sessionStorage.getItem('id')) {
        const userID = sessionStorage.getItem('id');
        this.router.navigate([`user/${userID}`]);
      } else {
        this.router.navigate(['']);
      }
      this.fetchData();
    }
  }

  fetchData() {
    this.product.getData().subscribe((data: any) => {
      this.prdList = data;
    });
  }
}
