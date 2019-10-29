import { Component, OnInit } from '@angular/core';
import { CatData } from '../cat-data.model';
import { Router } from '@angular/router';
import { ApiClientService } from '../api-client.service';

@Component({
  selector: 'app-new-cat',
  templateUrl: './new-cat.component.html',
  styleUrls: ['./new-cat.component.css']
})
export class NewCatComponent implements OnInit {

  constructor(private router: Router, private apiClientService: ApiClientService) {
  }

  data: CatData;

  ngOnInit() {
    this.resetData();
  }

  resetData() {
    this.data = {
      id: null,
      name: null,
      breed: null,
      color: null,
      age: null,
      image_url: null
    }
  }

  handleSubmit() {
    // todo...
    this.apiClientService.createCat(this.data).subscribe((data: CatData) => {
      this.router.navigate(['/view', data.id]);
    }, error => {
      console.log(error);
    })
  }


}
