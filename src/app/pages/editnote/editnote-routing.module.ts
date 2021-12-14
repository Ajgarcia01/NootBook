import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditnotePage } from './editnote.page';

const routes: Routes = [
  {
    path: '',
    component: EditnotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditnotePageRoutingModule {}
