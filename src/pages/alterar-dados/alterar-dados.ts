import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { LoginPage } from "../login/login"
import {Storage} from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-alterar-dados',
  templateUrl: 'alterar-dados.html',
})
export class AlterarDadosPage {
    data: any;
    token: any;
  email: any;
  cadastro: any = {};
  user: any ={};

  constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingController,public navCtrl: NavController, 
              public navParams: NavParams, public formBuilder: FormBuilder, public http: Http, private storage:Storage) {
  this.cadastro = this.formBuilder.group({
      nome:['', Validators.required],
      sobrenome:['', Validators.required],
      genero:['', Validators.required],
    })
     

    this.storage.get('user').then((val) => {
     this.email = val;
     this.storage.get('token').then((val) => {
      this.token = val;
      this.carregarDados();
      });
    });
  }

  carregarDados(){
    let url = "http://unionwebservice.azurewebsites.net/api/Usuarios/GetUsuarioId?Email="

    var headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.token);
    console.log(this.email)

    this.http.get(url + this.email, {headers:headers}).map(res => res.json())
      .subscribe(data => {
        this.data = data;
        console.log(data);

        this.cadastro.controls['nome'].setValue(data[0].Nome);
        this.cadastro.controls['sobrenome'].setValue(data[0].Sobrenome);
        this.cadastro.controls['genero'].setValue(data[0].Genero);

      });   
  };


  postDados(){
    let loading = this.loadingCtrl.create({
      content: 'Espere...'
    });
    loading.present();    

    this.user = {
                  "IdDadosUsuario": this.data[0].IdDadosUsuario, 
                  "IdUsuario": this.data[0].IdUsuario, 
                  "IdTipoPerfil": this.data[0].IdTipoPerfil,
                  "Nome": this.cadastro.value.nome, 
                  "Sobrenome": this.cadastro.value.sobrenome, 
                  "Genero": this.cadastro.value.genero
                };
    var link = "http://unionwebservice.azurewebsites.net/api/DadosUsuarios/PutDadosUsuarios";
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('IdUsuario', this.data.IdDadosUsuario);


    let body = urlSearchParams.toString();
    console.log(this.user);

    this.http.put(link, this.user, {headers:headers}).map(res => res.json())
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
