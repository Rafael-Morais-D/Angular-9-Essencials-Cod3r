import { Product } from './../product.model';
import { Component, OnInit } from '@angular/core';
import { ProductService } from './../product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product: Product;

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.readById(id).subscribe(product => {
      this.product = product;
    });
  }

  updateProduct(): void {
    if (!this.product.name || !this.product.price) {
      this.productService.showMessage('Não foi possível atualizar o produto!');
      this.router.navigate(["/products"]);
    } else {
      this.productService.update(this.product).subscribe(() => {
        this.productService.showMessage('Produto atualizado com sucesso!');
        this.router.navigate(["/products"]);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }
}
