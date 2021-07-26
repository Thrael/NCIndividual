import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShoppingItemComponent } from './shopping-item/shopping-item.component';
import { TopboardComponent } from './topboard/topboard.component';
import { ProductCatalogComponent } from './product-catalog/product-catalog.component';
import { PositionListComponent } from './position-list/position-list.component';
import { PositionService } from './position-service.service'
import { HttpClientModule } from '@angular/common/http';
import { LoginFormComponent } from './login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddwareFormComponent } from './addware-form/addware-form.component';
import { AdduserFormComponent } from './adduser-form/adduser-form.component';
import { ToppanelAnonComponent } from './toppanel-anon/toppanel-anon.component';
import { ProfileComponent } from './profile/profile.component';
import { PopupButtonComponent } from './popup-button/popup-button.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserIndicatorComponent } from './user-indicator/user-indicator.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CatalogMenuComponent } from './catalog-menu/catalog-menu.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatGridListModule } from '@angular/material/grid-list';
import { PromotionsComponent } from './promotions/promotions.component';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingItemComponent,
    TopboardComponent,
    ProductCatalogComponent,
    PositionListComponent,
    LoginFormComponent,
    AddwareFormComponent,
    AdduserFormComponent,
    ToppanelAnonComponent,
    ProfileComponent,
    PopupButtonComponent,
    UserIndicatorComponent,
    UserDetailsComponent,
    CatalogMenuComponent,
    PromotionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatTreeModule,
    MatGridListModule
  ],
  providers: [PositionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
