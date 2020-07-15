export class GameModel {
   id: string;
   player1Name: string;
   player2Name: string;
   player1Score: number;
   player2Score: number; 
   Player1Selection: Weapon;
   Player2Selection: Weapon;
   LastWinner: Winner;
}

export enum Winner {
   None = 1,
   Player1,
   Player2,
   Draw
}

export enum Weapon {
   Rock = 1,
   Paper,
   Scissors
}
