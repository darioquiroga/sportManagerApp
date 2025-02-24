import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { NgModule } from '@angular/core';
import { provideHttpClient } from '@angular/common/http'
import { LoginService } from './app/services/login.service';


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

@NgModule({
  declarations: [
    // otros componentes
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [provideHttpClient()]
})

export class AppModule {}



