import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CatData } from '../cat-data.model';

@Component({
  selector: 'app-cat-edit-form',
  templateUrl: './cat-edit-form.component.html',
  styleUrls: ['./cat-edit-form.component.css']
})
export class CatEditFormComponent implements OnInit {

  constructor() { }

  @Input() data: CatData;
  @Output() submitEvent = new EventEmitter();

  ngOnInit() {
  }

  handleSubmit() {
    this.submitEvent.emit(this.data);
  }

}
