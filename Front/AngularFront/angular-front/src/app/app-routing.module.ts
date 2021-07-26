import { PromotionsComponent } from './promotions/promotions.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { ProductCatalogComponent } from './product-catalog/product-catalog.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'catalog', component: ProductCatalogComponent },
  { path: '', component: PromotionsComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
