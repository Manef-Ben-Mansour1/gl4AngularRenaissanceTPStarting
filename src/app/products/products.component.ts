import { Component } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  concatMap,
  map,
  scan,
  takeWhile,
} from 'rxjs';
import { Product } from './dto/product.dto';
import { ProductService } from './services/product.service';
import { Settings } from './dto/product-settings.dto';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  public products$!: Observable<Product[]>;
  private settings$ = new BehaviorSubject<Settings>({ limit: 12, skip: 0 });
  public hasMoreProducts = true;

  constructor(private productService: ProductService) {
    this.products$ = this.settings$.pipe(
      takeWhile(() => this.hasMoreProducts),
      concatMap((settings) =>
        this.productService.getProducts(settings).pipe(
          map((response) => {
            if (response.products.length < settings.limit) {
              this.hasMoreProducts = false;
            }
            return response.products;
          })
        )
      ),
      scan(
        (allProducts: Product[], newProducts: Product[]) => [
          ...allProducts,
          ...newProducts,
        ],
        [] as Product[]
      )
    );
  }

  loadMore(): void {
    const currentSettings = this.settings$.getValue();
    this.settings$.next({
      ...currentSettings,
      skip: currentSettings.skip + currentSettings.limit,
    });
  }
}
