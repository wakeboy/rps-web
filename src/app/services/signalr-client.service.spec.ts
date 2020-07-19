import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { SignalrClientService } from './signalr-client.service';

describe('SignalrClientService', () => {
  let service: SignalrClientService;
  let store: MockStore;
  const initialState = {};
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore(initialState)]
    });

    store = TestBed.inject(MockStore);
    service = TestBed.inject(SignalrClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
