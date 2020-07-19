import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GameHttpService } from '../services/game-http.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { JoinGameComponent } from './join-game.component';
import { GameModel } from '../models/game.model';

describe('JoinGameComponent', () => {
  let component: JoinGameComponent;
  let mockStore: MockStore;
  let fixture: ComponentFixture<JoinGameComponent>;
  const initialState: any = { game: new GameModel() };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, 
        FormsModule,
        {
          provide: ActivatedRoute,
            useValue: {
              params: [{id: 'e8342bea-254f-4ca1-b31a-5a165298f195'}]
          }
        }
      ],
      providers: [provideMockStore(initialState)],
      declarations: [ JoinGameComponent ]
    })
    .compileComponents();

    TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
