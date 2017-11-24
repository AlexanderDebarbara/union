import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import {CacheModule} from 'ionic-cache';

import { MyApp } from './app.component';
import {LoginPage} from '../pages/login/login';
import { RedditService } from '../providers/reddit-service/reddit-service';
import { HomePage } from "../pages/home/home";
import { CadastroPage } from "../pages/cadastro/cadastro";
import { NoticiaCadastroPage } from "../pages/noticia-cadastro/noticia-cadastro";
import { AlterarUsuarioPage } from "../pages/alterar-usuario/alterar-usuario";
import { NoticiasTestePage } from "../pages/noticias-teste/noticias-teste";
import { AlterarDadosPage } from "../pages/alterar-dados/alterar-dados";

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    CadastroPage,
    NoticiaCadastroPage,
    AlterarUsuarioPage,
    NoticiasTestePage,
    AlterarDadosPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    CacheModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    CadastroPage,
    NoticiaCadastroPage,
    AlterarUsuarioPage,
    NoticiasTestePage,
    AlterarDadosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RedditService
  ]
})
export class AppModule {}
