import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { LoginPage } from "../login/login";
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Storage } from '@ionic/storage';
import { AlterarUsuarioPage } from "../alterar-usuario/alterar-usuario"



@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {
  cadastro: any = {};
  user: any ={};

  constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingController,public navCtrl: NavController, 
  public navParams: NavParams, public http: Http, public formBuilder: FormBuilder, private storage:Storage) {
     this.cadastro = this.formBuilder.group({
      email:['', Validators.required],
      senha:['', Validators.required],
      senhaConf:['', Validators.required]
    })
  }
  postDados(){
    let loading = this.loadingCtrl.create({
      content: 'Espere...'
    });
    loading.present();
    if(this.cadastro.value.senha == this.cadastro.value.senhaConf){
    

    this.user = {"Senha": this.cadastro.value.senha, "Email": this.cadastro.value.email}
    var link = "http://unionwebservice.azurewebsites.net/api/Usuarios/PostUsuario";
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('Email', this.user.Email);
    urlSearchParams.append('Senha', this.user.Senha);

    let body = urlSearchParams.toString();

    this.http.post(link, body, {headers:headers}).map(res => res.json())
      .subscribe(data => {
        loading.dismiss();
        this.storage.set('IdUsuario', data.IdUsuario);
        this.navCtrl.setRoot(AlterarUsuarioPage,{opt:{dismiss:false,redirect:AlterarUsuarioPage}});
       }, error => {         
        let alert = this.alertCtrl.create({
            title: 'Alerta',
            subTitle: error.message,
            buttons: ['OK']
        });
        loading.dismiss(); 
        alert.present();
      });    
    }else{               
        let alert = this.alertCtrl.create({
            title: 'Alerta',
            subTitle: 'As senhas não são iguais',
            buttons: ['OK']
        });
        loading.dismiss(); 
        alert.present();
    }

   
  }
  backPage(){
    this.navCtrl.setRoot(LoginPage,{opt:{dismiss:false,redirect:LoginPage}});
  }
}
