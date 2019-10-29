import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';


import { CatsListComponent } from './cats-list/cats-list.component';
import { HttpClientModule } from '@angular/common/http';
import { NewCatComponent } from './new-cat/new-cat.component';
import { EditCatComponent } from './edit-cat/edit-cat.component';
import { ViewCatComponent } from './view-cat/view-cat.component';
import { CatListItemComponent } from './cat-list-item/cat-list-item.component';
import { CatDeleteDialogComponent } from './cat-delete-dialog/cat-delete-dialog.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CatEditFormComponent } from './cat-edit-form/cat-edit-form.component';



@NgModule({
  declarations: [
    AppComponent,
    CatsListComponent,
    NewCatComponent,
    EditCatComponent,
    ViewCatComponent,
    CatListItemComponent,
    CatDeleteDialogComponent,
    NotFoundComponent,
    CatEditFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  entryComponents: [
    CatDeleteDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
