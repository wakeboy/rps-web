import { createReducer, on } from '@ngrx/store';
import { setGame } from './game.actions';
import { GameModel } from '../models/game.model';


export interface AppState {
    game: GameModel;
};

export const initialState: AppState = {
    game: new GameModel()
};

const _gameReducer = createReducer(initialState,
    on(setGame, (state, {game}) => ({...state, game: game}))
);

export function gameReducer(state, action) {
    return _gameReducer(state, action);
}