import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { StoreModule, EffectsModule } from 'juliette-ng';
import { initialAppState } from './store/app-state';
import { environment } from '../environments/environment';
import { UsersEffects } from './store/effects/users.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot(initialAppState, !environment.production),
    EffectsModule.forRoot([UsersEffects]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
