import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkCreationComponent } from './link-creation.component';

describe('LinkCreationComponent', () => {
  let component: LinkCreationComponent;
  let fixture: ComponentFixture<LinkCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
