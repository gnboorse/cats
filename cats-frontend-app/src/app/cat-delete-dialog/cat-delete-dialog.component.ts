import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CatData } from '../cat-data.model';
import { ApiClientService } from '../api-client.service';


@Component({
  selector: 'app-cat-delete-dialog',
  templateUrl: './cat-delete-dialog.component.html',
  styleUrls: ['./cat-delete-dialog.component.css']
})
export class CatDeleteDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CatDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CatData,
    private apiClientService: ApiClientService) { }

  ngOnInit() {
  }

  onCancel() {
    this.dialogRef.close(false);
  }

  onSubmit() {
    this.dialogRef.close(true);
  }

}
