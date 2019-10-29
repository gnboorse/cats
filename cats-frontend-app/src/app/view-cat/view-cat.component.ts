import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CatData } from '../cat-data.model';
import { ApiClientService } from '../api-client.service';

@Component({
  selector: 'app-view-cat',
  templateUrl: './view-cat.component.html',
  styleUrls: ['./view-cat.component.css']
})
export class ViewCatComponent implements OnInit {

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

  handleItemDeletedEvent(data: CatData) {
    this.apiClientService.deleteCatById(data.id).subscribe((data: CatData) => {
      this.router.navigate(['/list'])
    }, error => console.log(error))
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.getCat(this.id);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
