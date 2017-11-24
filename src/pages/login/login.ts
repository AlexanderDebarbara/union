import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

import { IonicPage, NavController, NavParams, LoadingController, AlertController  } from 'ionic-angular';
import { CacheService } from 'ionic-cache';
import { HomePage } from "../home/home";
import { CadastroPage } from "../cadastro/cadastro";
import { Http, Headers, URLSearchParams } from '@angular/http';
import {Storage} from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  login : any = {};
  user: any = {};
  data: any = {};

  constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingController,private storage:Storage, public navCtrl: NavController, 
  public cache: CacheService, public http: Http, public navParams: NavParams, public formBuilder: FormBuilder) {
    this.login = this.formBuilder.group({
      email:['', Validators.required],
      senha:['', Validators.required]
    })
  }  

  postDados(){
    let loading = this.loadingCtrl.create({
      content: 'Espere...'
    });
    loading.present();

    this.user = {"Senha": this.login.value.senha, "Email": this.login.value.email}
    var link = "http://unionwebservice.azurewebsites.net/token";
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('grant_type', 'password');
    urlSearchParams.append('username', this.user.Email);
    urlSearchParams.append('password',this.user.Senha);

    let body = urlSearchParams.toString();

    this.http.post(link, body, {headers:headers}).map(res => res.json())
      .subscribe(data => {
        loading.dismiss();  
        let token = data.access_token;
        let user_auth = this.user.Email; 
        this.storage.set('token', token);
        this.storage.set('user', user_auth);
        this.navCtrl.setRoot(HomePage,{opt:{dismiss:false,redirect:HomePage}});
       }, error => {
         
        let alert = this.alertCtrl.create({
            title: 'Alerta',
            subTitle: 'Senha ou e-mail incorreto',
            buttons: ['OK']
        });
        loading.dismiss(); 
        alert.present();
      });    

  }
  getPageCadastro(){
        this.navCtrl.setRoot(CadastroPage,{opt:{dismiss:false,redirect:CadastroPage}});

  }

}
