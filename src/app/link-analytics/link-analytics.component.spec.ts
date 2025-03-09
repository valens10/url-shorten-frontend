import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkAnalyticsComponent } from './link-analytics.component';

describe('LinkAnalyticsComponent', () => {
  let component: LinkAnalyticsComponent;
  let fixture: ComponentFixture<LinkAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkAnalyticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
