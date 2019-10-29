import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatsListComponent } from './cats-list/cats-list.component'


const routes: Routes = [
  {
    path: 'list',
    component: CatsListComponent,
    data: {
      title: 'Cats List'
    }
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
