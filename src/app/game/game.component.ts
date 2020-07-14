import { Component, OnInit } from '@angular/core';
import { SignalrClientService } from '../services/signalr-client.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  title = 'Rock Paper Scissors';
  userScore = 0;
  compScore = 0;
  userSelected: string;
  compSelected: string;
  action: string;
  status: string;
  compWeapons = [
    'rock',
    'paper',
    'scissors'
  ];

  constructor(public signalrClientService: SignalrClientService){
  }
  
  ngOnInit(): void {
    this.signalrClientService.startConnection();
    this.signalrClientService.addPickListener();
  }

  userPick(userWeapon: string): void {
    this.userSelected = userWeapon;
    console.log(this.userSelected);
    this.signalrClientService.pick(userWeapon);
    setTimeout(() => {
      const randomNum = Math.floor(Math.random()*3);
      this.compSelected = this.compWeapons[randomNum];
      console.log(this.compSelected);
      this.checkResult();
    }, 1000);
  }

  clearField() {
    setTimeout(() =>{
      this.status = '';
      this.userSelected = '';
      this.compSelected = '';
    }, 1500);
  }

  win(user, comp) {
    this.userScore++;
    this.userSelected = user;
    this.compSelected = comp;
    this.action = 'beats';
    this.status = '. You win!';
    this.clearField();
  }

  lose(user, comp) {
    this.compScore++;
    this.userSelected = user;
    this.compSelected = comp;
    this.action = 'lose to';
    this.status = '. you lose!';
    this.clearField();
  }

  draw(user, comp){
    this.userSelected = user;
    this.compSelected = comp;
    this.action = 'and';
    this.status = '. You draw!';
    this.clearField();
  }

  checkResult(){
    const userChoice = this.userSelected;
    const compChoice = this.compSelected;
    switch(userChoice + compChoice){
      case 'rockscissors':
      case 'paperrock':
      case 'scissorspaper':
        this.win(userChoice, compChoice);
        break;
      case 'rockpaper':
      case 'scissorsrock':
      case 'paperscissors':
        this.lose(userChoice, compChoice);
        break;
      default: 
        this.draw(userChoice, compChoice);
        break;
    }
  }
}
