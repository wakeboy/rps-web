import { createAction, props } from '@ngrx/store';
import { GameModel } from '../models/game.model';


export const setGame = createAction('[Game Component] SetGame', props<{game: GameModel}>());
export const setGameAndPlayer = createAction('[Game Component] SetGameAndPlayer', props<{game: GameModel, playerName: string}>());
export const setPlayerName = createAction('[Game Component] SetPlayerName', props<{playerName: string}>())
export const resetGame = createAction("[Game Component] ResetGame");