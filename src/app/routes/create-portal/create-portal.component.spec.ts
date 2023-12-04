import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreatePortalComponent} from './create-portal.component';

describe('CreatePortalComponent', () => {
  let component: CreatePortalComponent;
  let fixture: ComponentFixture<CreatePortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePortalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CreatePortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
