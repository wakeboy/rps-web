import { GameModel } from '../models/game.model';
import { AppState } from './game.reducer';
import { createSelector } from '@ngrx/store';

export const selectState = (state: AppState) => state;

export const selectAppState = createSelector(
    selectState,
    (state: any) => {
        return state.state;
    }
);