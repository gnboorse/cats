import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatEditFormComponent } from './cat-edit-form.component';

describe('CatEditFormComponent', () => {
  let component: CatEditFormComponent;
  let fixture: ComponentFixture<CatEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
