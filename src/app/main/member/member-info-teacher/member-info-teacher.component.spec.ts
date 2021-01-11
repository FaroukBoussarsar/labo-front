import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberInfoTeacherComponent } from './member-info-teacher.component';

describe('MemberInfoTeacherComponent', () => {
  let component: MemberInfoTeacherComponent;
  let fixture: ComponentFixture<MemberInfoTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberInfoTeacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberInfoTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
