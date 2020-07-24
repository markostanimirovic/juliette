import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JulietteComponent } from './juliette.component';

describe('JulietteComponent', () => {
  let component: JulietteComponent;
  let fixture: ComponentFixture<JulietteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JulietteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JulietteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
