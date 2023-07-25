import { NgModule } from '@angular/core';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { RouterModule } from '@angular/router';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { ProductDetailGuard } from './product-detail.guard';
import { ShareModule } from '../shared/share.module';



@NgModule({
  declarations: [
    ProductListComponent ,
    ProductDetailComponent ,
    ConvertToSpacesPipe
  ],
  imports: [

    RouterModule.forChild([
      {path : 'products' , component : ProductListComponent} ,
      {
        path : 'products/:id', 
        canActivate : [ProductDetailGuard] ,
       component : ProductDetailComponent
      }]
      ),
    ShareModule

  ]
})
export class ProductModule { }
