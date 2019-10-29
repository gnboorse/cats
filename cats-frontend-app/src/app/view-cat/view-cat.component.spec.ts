import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCatComponent } from './view-cat.component';

describe('ViewCatComponent', () => {
  let component: ViewCatComponent;
  let fixture: ComponentFixture<ViewCatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
