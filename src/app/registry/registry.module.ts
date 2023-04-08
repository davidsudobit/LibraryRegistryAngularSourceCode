import { EntryService } from './registry-entry-form/Service/EntryService';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistryRoutingModule } from './registry-routing.module';
import { RegistryEntryFormComponent } from './registry-entry-form/registry-entry-form.component';
import { RegistryTableComponent } from './registry-table/registry-table.component';
import { RegistryOriginComponent } from './registry-origin/registry-origin.component';
import { RegistryExitFormComponent } from './registry-exit-form/registry-exit-form.component';
import { NotFoundComponent } from './Not-Found/not-found/not-found.component';


@NgModule({
  declarations: [
    RegistryEntryFormComponent,
    RegistryTableComponent,
    RegistryOriginComponent,
    RegistryExitFormComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    RegistryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers:[
    EntryService
  ]
})
export class RegistryModule { }
