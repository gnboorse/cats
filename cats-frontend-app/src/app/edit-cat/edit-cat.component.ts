import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatData } from '../cat-data.model';
import { ApiClientService } from '../api-client.service';


@Component({
  selector: 'app-edit-cat',
  templateUrl: './edit-cat.component.html',
  styleUrls: ['./edit-cat.component.css']
})
export class EditCatComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiClientService: ApiClientService) { }

  id: number;

  private sub: any;

  data: CatData;

  getCat(id: number) {
    this.apiClientService.findCatById(id).subscribe((data: CatData) => {
      this.data = data;
    }, error => this.router.navigate(['/notfound']));
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.getCat(this.id)
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  handleSubmit() {
    this.apiClientService.updateCat(this.data, this.data.id).subscribe((data: CatData) => {
      this.router.navigate(['/view', data.id]);
    }, error => {
      console.log(error);
    })
  }
}
