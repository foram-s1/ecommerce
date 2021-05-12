import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { TransactionComponent } from './transaction/transaction.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'cart', component: CartComponent, canActivate: [AuthenticationService]},
  {path:'order', component: OrderComponent, canActivate: [AuthenticationService] },
  {path:'transaction', component: TransactionComponent, canActivate: [AuthenticationService]},
  {path:'profile', component: ProfileComponent, canActivate: [AuthenticationService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
