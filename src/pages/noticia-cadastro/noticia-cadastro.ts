import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Storage } from '@ionic/storage';
import { HomePage } from "../home/home";
import { Base64 } from '@ionic-native/base64';


@IonicPage()
@Component({
  selector: 'page-noticia-cadastro',
  templateUrl: 'noticia-cadastro.html',
})
export class NoticiaCadastroPage {
    imageUrl: any;
  image64: string;
  token: any;
  noticia: any = {};
  iduser: any;
  cadastro: any = {};

  constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingController, private storage:Storage, public http: Http,
              public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
    this.cadastro = this.formBuilder.group({
      title:['', Validators.required],
      description:['', Validators.required],
      local:['', Validators.required]
    })

    this.storage.get('IdUsuario').then((val) => {
     this.iduser = val;
    });
    this.storage.get('token').then((val) => {
     this.token = val;
    });
  }
  postDados(){
    let loading = this.loadingCtrl.create({
      content: 'Espere...'
    });
    loading.present();    

    var base64 = new Base64();
    base64.encodeFile(this.imageUrl).then((base64File: string) => {
        this.image64 = base64File;
    }, (err) => {
      console.log(err);
    });
    


    this.noticia = {
                  "Titulo": this.cadastro.value.title, 
                  "Descricao": this.cadastro.value.description,
                  "Thumbnail": this.image64, 
                  "Localizacao": this.cadastro.value.local, 
                  "IdUsuario": 1
                };

    console.log(this.noticia);
    
    var link = "http://unionwebservice.azurewebsites.net/api/Publicacaos/PostPublicacao";
    var headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.token);
    headers.append('Content-Type', 'application/json');

    this.http.post(link, this.noticia, {headers:headers}).map(res => res.json())
      .subscribe(data => {
        loading.dismiss();
        this.navCtrl.setRoot(HomePage,{opt:{dismiss:false,redirect:HomePage}});
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

  imageUpload(e) {
        let reader = new FileReader();
        //get the selected file from event
        let file = e.target.files[0];
        reader.onloadend = () => {
          //Assign the result to variable for setting the src of image element
          this.imageUrl = reader.result;
        }
        reader.readAsDataURL(file);
      }
    

}
