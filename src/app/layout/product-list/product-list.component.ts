import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../interface/Product';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [TruncatePipe, CurrencyPipe, CommonModule, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  prdList: Product[] | any = [];
  constructor(private productService:ProductService,protected toastrService:ToastrService){}
  ngOnInit(): void {
      this.getAllPrd();
  }
  getAllPrd(){
    this.productService.getPrdAdmin().subscribe((data:any) => {
     this.prdList = data
    })
 }
 delettePrd(id:string){
    const isDelete = confirm('Are you sure you want to delete');
    if(isDelete){
      this.productService.deletePrdAdmin(id)
      .subscribe(() => {
       this.toastrService.success("Deleted-successfully", "Success");
        this.getAllPrd();
      })
    }else{
      this.toastrService.error("Delete is cancel", "Error")
    }
    
 }
}
 