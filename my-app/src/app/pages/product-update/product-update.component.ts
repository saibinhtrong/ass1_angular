import { Component } from '@angular/core';
import { IProduct } from 'src/app/interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss'],
})
export class ProductUpdateComponent {
  product!: IProduct;
  productForm = this.formBuilder.group({
    name: [''],
    price: [0],
  });
  constructor(
    private ProductService: ProductService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.paramMap.subscribe((param) => {
      const id = Number(param.get('id'));
      this.ProductService.getProductById(id).subscribe((product) => {
        this.product = product;
        this.productForm.patchValue({
          name: product.name,
          price: product.price,
        });
      });
    });
  }
  onHandleUpdate() {
    if (this.productForm.valid) {
      const newProduct: IProduct = {
        id: this.product.id,
        name: this.productForm.value.name || '',
        price: this.productForm.value.price || 0,
      };
      this.ProductService.updateProduct(newProduct).subscribe((data) => {
        console.log(data);
        this.router.navigate(['/admin/products']);
      });
    }
  }
}
