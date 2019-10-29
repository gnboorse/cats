import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';



import { CatsListComponent } from './cats-list/cats-list.component';
import { HttpClientModule } from '@angular/common/http';
import { NewCatComponent } from './new-cat/new-cat.component';
import { EditCatComponent } from './edit-cat/edit-cat.component';
import { ViewCatComponent } from './view-cat/view-cat.component';



@NgModule({
  declarations: [
    AppComponent,
    CatsListComponent,
    NewCatComponent,
    EditCatComponent,
    ViewCatComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
