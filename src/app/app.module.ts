import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StoreModule }  from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { GameComponent } from './game/game.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { HomeComponent } from './home/home.component';
import { JoinGameComponent } from './join-game/join-game.component';
import { gameReducer } from './state-management/game.reducer';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    CreateGameComponent,
    HomeComponent,
    JoinGameComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({ state: gameReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
