import { createReducer, on } from '@ngrx/store';
import { setGame, setPlayerName } from './game.actions';
import { GameModel } from '../models/game.model';


export interface AppState {
    game: GameModel;
    playerName: string
};

export const initialState: AppState = {
    game: new GameModel(),
    playerName: ''
};

const _gameReducer = createReducer(initialState,
    on(setGame, (state, {game, playerName}) => ({...state, game: game, playerName: playerName})),
    on(setPlayerName, (state, {playerName}) => ({...state, playerName: playerName}))
);

export function gameReducer(state, action) {
    return _gameReducer(state, action);
}