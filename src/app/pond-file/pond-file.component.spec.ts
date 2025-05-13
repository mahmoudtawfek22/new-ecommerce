import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PondFileComponent } from './pond-file.component';

describe('PondFileComponent', () => {
  let component: PondFileComponent;
  let fixture: ComponentFixture<PondFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PondFileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PondFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
