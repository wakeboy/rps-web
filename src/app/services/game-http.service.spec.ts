import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GameHttpService } from './game-http.service';

describe('GameHttpService', () => {
  let service: GameHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', () => {
    service = TestBed.get(GameHttpService);
    expect(service).toBeTruthy();
  });
});
