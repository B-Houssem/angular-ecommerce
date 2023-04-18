import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit{
  
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;


  constructor(private cartService: CartService){}

  ngOnInit(): void {
    this.listCartDetails();
  }
  listCartDetails() {
    // get a handle to the cart item
    this.cartItems = this.cartService.cartItem;

    //subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    //sibscribe to the cart totalQuantity
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    //compute total price and quantity
    this.cartService.computeCartTotals();

  }

  incrementQuantity(theCartItem: CartItem){

    this.cartService.addToCart(theCartItem);
  }

  decrementQuantity(theCartItem: CartItem){
    this.cartService.decrementQuantity(theCartItem);
  }
  remove(theCartItem: CartItem){

    this.cartService.remove(theCartItem);
  }
}
