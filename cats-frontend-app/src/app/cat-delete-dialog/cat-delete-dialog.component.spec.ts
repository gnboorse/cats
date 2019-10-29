import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatDeleteDialogComponent } from './cat-delete-dialog.component';

describe('CatDeleteDialogComponent', () => {
  let component: CatDeleteDialogComponent;
  let fixture: ComponentFixture<CatDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
