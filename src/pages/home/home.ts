import { Component } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { NavController, LoadingController, ActionSheetController, ViewController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Storage} from '@ionic/storage';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {

  public feeds: Array<any>;  
  private url: string = "http://unionwebservice.azurewebsites.net/api/Publicacaos/GetPublicacoes";
  private newerPosts: string = "http://unionwebservice.azurewebsites.net/api/Publicacaos/GetPublicacoes?id=";

  public noFilter: Array<any>;
  public hasFilter: boolean = false;
  token: any;

  constructor(public navCtrl: NavController,public viewCtrl:ViewController, public http: Http, public loadingCtrl: LoadingController, 
              public actionSheetCtrl: ActionSheetController, private storage:Storage) {
    this.viewCtrl.showBackButton(false);

    this.storage.get('token').then((val) => {
     this.token = val;

     this.fetchContent();
    });

    
  }
   fetchContent ():void {
    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });


    loading.present();

    var headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.token);

    this.http.get(this.url, {headers:headers}).map(res => res.json())
      .subscribe(data => {
        console.log(data[0].Descricao);
        this.feeds = data;
        console.log(this.feeds[0].Thumbnail);       

        loading.dismiss();        

      });     
  }
  doRefresh(refresher) {

    let paramsUrl = this.feeds[0].id;

    var headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.token);

    this.http.get(this.newerPosts + paramsUrl, {headers:headers}).map(res => res.json())
      .subscribe(data => {
       
       if(data[0].id != paramsUrl){
        this.feeds = data.concat(this.feeds);
       }
        
        refresher.complete();
      });
  }
}
