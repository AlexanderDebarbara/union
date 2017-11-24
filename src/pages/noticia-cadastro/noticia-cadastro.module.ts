import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoticiaCadastroPage } from './noticia-cadastro';

@NgModule({
  declarations: [
    NoticiaCadastroPage,
  ],
  imports: [
    IonicPageModule.forChild(NoticiaCadastroPage),
  ],
})
export class NoticiaCadastroPageModule {}
