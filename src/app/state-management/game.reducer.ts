import { createReducer, on, ActionReducerMap } from '@ngrx/store';
import { setGame, setPlayerName, setGameAndPlayer, resetGame } from './game.actions';
import { GameModel } from '../models/game.model';


export interface AppState {
    game: GameModel;
    playerName: string
};

export const initialState: AppState = {
    game: new GameModel(),
    playerName: null
};

const _gameReducer = createReducer(initialState,
    on(setGame, (state, { game }) => ({...state, game: game })),
    on(setGameAndPlayer, (state, { game, playerName}) => ({...state, game: game, playerName: playerName})),
    on(setPlayerName, (state, { playerName }) => ({...state, playerName: playerName})),
    on(resetGame, state => state = initialState)
);

export function gameReducer(state, action) {
    return _gameReducer(state, action);
}