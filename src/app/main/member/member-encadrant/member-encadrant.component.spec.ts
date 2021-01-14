import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberEncadrantComponent } from './member-encadrant.component';

describe('MemberEncadrantComponent', () => {
  let component: MemberEncadrantComponent;
  let fixture: ComponentFixture<MemberEncadrantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberEncadrantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberEncadrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
