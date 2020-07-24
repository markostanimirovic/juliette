import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JulietteNgComponent } from './juliette-ng.component';

describe('JulietteNgComponent', () => {
  let component: JulietteNgComponent;
  let fixture: ComponentFixture<JulietteNgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JulietteNgComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JulietteNgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
