import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { LoginPage } from "../login/login"
import {Storage} from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-alterar-usuario',
  templateUrl: 'alterar-usuario.html',
})
export class AlterarUsuarioPage {
  iduser: any;
  cadastro: any = {};
  user: any ={};

  constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingController,public navCtrl: NavController, 
              public navParams: NavParams, public formBuilder: FormBuilder, public http: Http, private storage:Storage) {
  this.cadastro = this.formBuilder.group({
      nome:['', Validators.required],
      sobrenome:['', Validators.required],
      genero:['', Validators.required],
    })

    this.storage.get('IdUsuario').then((val) => {
     this.iduser = val;
    });
  }
  postDados(){
    let loading = this.loadingCtrl.create({
      content: 'Espere...'
    });
    loading.present();    

    this.user = {
                  "IdUsuario": this.iduser, 
                  "IdTipoPerfil": 1,
                  "Nome": this.cadastro.value.nome, 
                  "Sobrenome": this.cadastro.value.sobrenome, 
                  "Genero": this.cadastro.value.genero
                };
    
    console.log(this.iduser);
    let idTipo = '0';
    var link = "http://unionwebservice.azurewebsites.net/api/DadosUsuarios/PostDadosUsuario";
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('IdUsuario', this.iduser);
    urlSearchParams.append('IdTipoPerfil', idTipo);
    urlSearchParams.append('Nome', this.user.Nome);
    urlSearchParams.append('Sobrenome', this.user.Sobrenome);
    urlSearchParams.append('Genero', this.user.Genero);


    let body = urlSearchParams.toString();
    console.log(body);

    this.http.post(link,this.user, {headers:headers}).map(res => res.json())
      .subscribe(data => {
        loading.dismiss();
        this.navCtrl.setRoot(LoginPage,{opt:{dismiss:false,redirect:LoginPage}});
       }, error => {         
         console.log(error);
        let alert = this.alertCtrl.create({
            title: 'Alerta',
            subTitle: error.message,
            buttons: ['OK']
        });
        loading.dismiss(); 
        alert.present();
      });

  }  
}
