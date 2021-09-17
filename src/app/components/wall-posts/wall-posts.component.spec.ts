import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WallPostsComponent } from './wall-posts.component';

describe('WallPostsComponent', () => {
  let component: WallPostsComponent;
  let fixture: ComponentFixture<WallPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WallPostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WallPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
