import { NotFoundComponent } from './Not-Found/not-found/not-found.component';
import { RegistryExitFormComponent } from './registry-exit-form/registry-exit-form.component';
import { RegistryOriginComponent } from './registry-origin/registry-origin.component';
import { RegistryTableComponent } from './registry-table/registry-table.component';
import { RegistryEntryFormComponent } from './registry-entry-form/registry-entry-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:"addentry",component:RegistryEntryFormComponent,
  },
  {
    path:"addexit",component:RegistryExitFormComponent,
  },
  {
    path:"registrytable",component:RegistryTableComponent,
  },
  {
    path:"**",component:NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistryRoutingModule { }
