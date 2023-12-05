import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PublicserviceService } from './publicservice.service';



describe('PublicserviceService', () => {
  let service: PublicserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PublicserviceService],
    });
    service = TestBed.inject(PublicserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
