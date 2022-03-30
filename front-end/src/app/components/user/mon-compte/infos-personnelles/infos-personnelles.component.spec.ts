import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosPersonnellesComponent } from './infos-personnelles.component';

describe('InfosPersonnellesComponent', () => {
  let component: InfosPersonnellesComponent;
  let fixture: ComponentFixture<InfosPersonnellesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfosPersonnellesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfosPersonnellesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
