import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { usersStateConfig } from './store/handlers/users.handlers';
import { UsersEffects } from './store/effects/users.effects';
import { StoreModule } from 'juliette-ng';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, StoreModule.forRoot([usersStateConfig], [UsersEffects], true)],
  bootstrap: [AppComponent],
})
export class AppModule {}
