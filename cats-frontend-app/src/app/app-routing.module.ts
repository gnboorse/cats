import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatsListComponent } from './cats-list/cats-list.component'
import { EditCatComponent } from './edit-cat/edit-cat.component';
import { NewCatComponent } from './new-cat/new-cat.component';
import { ViewCatComponent } from './view-cat/view-cat.component';


const routes: Routes = [
  {
    path: 'list',
    component: CatsListComponent,
    data: {
      title: 'Cats List'
    }
  },
  {
    path: 'view/:id',
    component: ViewCatComponent
  },
  {
    path: 'edit/:id',
    component: EditCatComponent
  },
  {
    path: 'new',
    component: NewCatComponent
  },
  {
    path: '',
    redirectTo: '/list',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
