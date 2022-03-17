import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyDateEditorComponent } from './supply-date-editor.component';

describe('SupplyDateEditorComponent', () => {
  let component: SupplyDateEditorComponent;
  let fixture: ComponentFixture<SupplyDateEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplyDateEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplyDateEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
