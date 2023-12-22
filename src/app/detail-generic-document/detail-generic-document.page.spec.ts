import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailGenericDocumentPage } from './detail-generic-document.page';

describe('DetailGenericDocumentPage', () => {
  let component: DetailGenericDocumentPage;
  let fixture: ComponentFixture<DetailGenericDocumentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetailGenericDocumentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
