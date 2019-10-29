import { Component, OnInit, Input } from '@angular/core';
import { CatData } from '../cat-data.model';

@Component({
  selector: 'app-cat-list-item',
  templateUrl: './cat-list-item.component.html',
  styleUrls: ['./cat-list-item.component.css']
})
export class CatListItemComponent implements OnInit {

  constructor() { }

  @Input() data: CatData;
  @Input() expandedView: boolean;

  ngOnInit() {
  }

}
