import { Component, OnInit } from '@angular/core';
import { CatData } from '../cat-data.model';
import { ApiClientService } from '../api-client.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cats-list',
  templateUrl: './cats-list.component.html',
  styleUrls: ['./cats-list.component.css']
})
export class CatsListComponent implements OnInit {

  constructor(private apiClientService: ApiClientService, private _snackBar: MatSnackBar) { }

  cats: CatData[];

  getCats() {
    this.apiClientService.findAllCats().subscribe((data: CatData[]) => {
      this.cats = data;
    },
      error => console.log(error));
  }

  handleItemDeletedEvent(data: CatData) {
    this.apiClientService.deleteCatById(data.id).subscribe((data: CatData) => {
      this.openSnackBar(`Deleted cat with name: ${data.name}`, "Close");
      this.getCats();
    }, error => console.log(error))
  }

  ngOnInit() {
    this.getCats();
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
