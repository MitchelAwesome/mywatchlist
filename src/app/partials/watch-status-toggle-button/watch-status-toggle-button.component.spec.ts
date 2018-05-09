import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchStatusToggleButtonComponent } from './watch-status-toggle-button.component';

describe('WatchStatusToggleButtonComponent', () => {
  let component: WatchStatusToggleButtonComponent;
  let fixture: ComponentFixture<WatchStatusToggleButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchStatusToggleButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchStatusToggleButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
