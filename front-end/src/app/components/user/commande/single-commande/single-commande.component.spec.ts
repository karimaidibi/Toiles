import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCommandeComponent } from './single-commande.component';

describe('SingleCommandeComponent', () => {
  let component: SingleCommandeComponent;
  let fixture: ComponentFixture<SingleCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleCommandeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
