import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CreateGameComponent } from './create-game.component';
import { GameModel } from '../models/game.model';

describe('CreateGameComponent', () => {
  let component: CreateGameComponent;
  let mockStore: MockStore;
  let fixture: ComponentFixture<CreateGameComponent>;
  const initialState: any = { game: new GameModel() };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule],
      providers: [provideMockStore(initialState)],
      declarations: [ CreateGameComponent ]
    })
    .compileComponents();

    TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
