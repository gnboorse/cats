import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CatData } from '../cat-data.model';
import { MatDialog } from '@angular/material/dialog';

import { CatDeleteDialogComponent } from '../cat-delete-dialog/cat-delete-dialog.component';


@Component({
  selector: 'app-cat-list-item',
  templateUrl: './cat-list-item.component.html',
  styleUrls: ['./cat-list-item.component.css']
})
export class CatListItemComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  @Input() data: CatData;
  @Input() expandedView: boolean;
  @Output() deletedEvent = new EventEmitter();


  ngOnInit() {
  }

  deleteOnClick() {
    const dialogRef = this.dialog.open(CatDeleteDialogComponent, {
      width: '400px',
      data: this.data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deletedEvent.emit(this.data);
      }
    });
  }


}
