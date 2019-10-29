import { Component, OnInit } from '@angular/core';
import { CatData } from '../cat-data.model';
import { ApiClientService } from '../api-client.service';

@Component({
  selector: 'app-cats-list',
  templateUrl: './cats-list.component.html',
  styleUrls: ['./cats-list.component.css']
})
export class CatsListComponent implements OnInit {

  constructor(private apiClientService: ApiClientService) { }

  cats: CatData[];

  getCats() {
    this.apiClientService.findAllCats().subscribe((data: CatData[]) => {
      this.cats = data;
    },
      error => console.log(error));
  }

  ngOnInit() {
    this.getCats();
  }

}
