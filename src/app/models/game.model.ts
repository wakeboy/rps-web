export enum Winner {
   None = 1,
   Player1,
   Player2,
   Draw
}

export enum Weapon {
   None = 1,
   Rock,
   Paper,
   Scissors
}

export interface Player {
   name: string;
   score: number;
   selection: Weapon;
   previousSelection: Weapon;
}

export class PlayerModel implements Player {
   name: null;
   score: 0;
   selection: Weapon.None;
   previousSelection: Weapon.None;
}

export interface Game {
   id: string;
   player1: Player;
   player2: Player;
   lastWinner: Winner;
}

export class GameModel implements Game {
   id: null;
   player1: Player = new PlayerModel();
   player2: Player = new PlayerModel();
   lastWinner: Winner.None;
}
