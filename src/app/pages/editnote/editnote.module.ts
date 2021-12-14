import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditnotePageRoutingModule } from './editnote-routing.module';

import { EditnotePage } from './editnote.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditnotePageRoutingModule
  ],
  declarations: [EditnotePage]
})
export class EditnotePageModule {}
