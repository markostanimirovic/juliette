import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { StoreModule, EffectsModule } from 'juliette-ng';
import { initialAppState } from './store';
import { environment } from '../environments/environment';
import { UsersEffects } from './store/effects/users.effects';
import { AppRoutingModule } from './app-routing.module';
import { UsersComponent } from './containers/users.component';

@NgModule({
  declarations: [AppComponent, UsersComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot(initialAppState, !environment.production),
    EffectsModule.register([UsersEffects]),
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
