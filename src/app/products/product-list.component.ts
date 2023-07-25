import { Component, OnDestroy, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./products.service";
import { Subscription } from "rxjs";

@Component({
    
    templateUrl : "./product-list.component.html" ,
    styleUrls : ['./product-list.component.css']
})
export class ProductListComponent implements OnInit , OnDestroy{
    pageTitle : string = "Products";
    imagewidth: number = 50;
    imageMargin : number = 2;
    showImage = false;
    errorMessage : string = '';

    sub!: Subscription;
    
    private _listFilter : string = '';
    get ListFilter() : string {
      return this._listFilter;
    }
    set ListFilter(value : string ) {
      this._listFilter = value;
      console.log("In setter : " + value);

      this.filterProducts = this.performFilter(value);

      console.log(this.filterProducts)

    }

    private _productService : ProductService ;
    constructor(private productService : ProductService){
      this._productService = productService;

    }

    products : IProduct[] =[
        
    ];
    filterProducts : IProduct[] = [];

    toggleImage() : void{
      this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        console.log("In OnInit");
        this.sub = this._productService.getProducts().subscribe(
          {
            next : (products) => {
              this.products = products;
              this.filterProducts = this.products;

             } ,
            error :err =>  this.errorMessage = err
          }
        )
        
        
        
    }
    performFilter(filterBy : string) : IProduct[]{
      filterBy = filterBy.toLocaleLowerCase();

      return this.products.filter((product : IProduct ) =>
      
        product.productName.toLocaleLowerCase().includes(filterBy)

      );


    }

    onRatingclicked(message: string) : void{
      this.pageTitle = "Product " + message
    }

    ngOnDestroy(): void {
      this.sub.unsubscribe();
        
    }

}