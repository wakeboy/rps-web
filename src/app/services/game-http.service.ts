import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { CreateGameModel } from '../models/create.game.model';
import { environment } from "./../../environments/environment"
import { GameModel } from '../models/game.model';
import { catchError }  from 'rxjs/operators';
import { JoinGameModel } from '../models/join.game.model';

@Injectable({
  providedIn: 'root'
})
export class GameHttpService {


  constructor(private http: HttpClient) { }

  createGame(createGame: CreateGameModel): Observable<GameModel> {
    return this.http.post<GameModel>(environment.gameApiUrl + "/api/game/create", createGame)
               .pipe(catchError(this.handleError));
  }

  joinGame(joinGameModel: JoinGameModel): Observable<GameModel> {
    return this.http.post<GameModel>(environment.gameApiUrl + '/api/game/join-game', joinGameModel)
               .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError('Something bad happened, please try again.');
  }
}
