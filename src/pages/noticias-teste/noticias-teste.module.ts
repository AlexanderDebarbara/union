import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoticiasTestePage } from './noticias-teste';

@NgModule({
  declarations: [
    NoticiasTestePage,
  ],
  imports: [
    IonicPageModule.forChild(NoticiasTestePage),
  ],
})
export class NoticiasTestePageModule {}
