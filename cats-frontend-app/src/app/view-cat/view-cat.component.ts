import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-cat',
  templateUrl: './view-cat.component.html',
  styleUrls: ['./view-cat.component.css']
})
export class ViewCatComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  id: number;

  private sub: any;


  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
