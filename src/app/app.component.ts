import { Component, ViewChild  } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import { CacheService } from 'ionic-cache';
import { NoticiaCadastroPage } from "../pages/noticia-cadastro/noticia-cadastro";
import { NoticiasTestePage } from "../pages/noticias-teste/noticias-teste";
import { AlterarDadosPage } from "../pages/alterar-dados/alterar-dados";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('menu') nav: NavController;
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar,  cache: CacheService, splashScreen: SplashScreen) {



    platform.ready().then(() => {
          cache.setDefaultTTL(60 * 60 * 12);
          cache.setOfflineInvalidate(false);
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  goPage(page){
    if(page == "Home"){
      this.nav.setRoot(NoticiasTestePage,{opt:{dismiss:false,redirect:NoticiasTestePage}});
    }
    if(page == "CadastroNoticias"){
      this.nav.setRoot(NoticiaCadastroPage, {opt:{dismiss:false,redirect:NoticiaCadastroPage}})
    }
    if(page == "Perfil"){
      this.nav.setRoot(AlterarDadosPage, {opt:{dismiss:false,redirect:AlterarDadosPage}})
    }
  }
  logout(){
    this.nav.setRoot(LoginPage,{opt:{dismiss:false,redirect:LoginPage}});
  }


}

