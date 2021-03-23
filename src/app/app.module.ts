import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ChildComponent } from './components/child/child.component';
import { ParentComponent } from './components/parent/parent.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    ChildComponent,
    ParentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [ParentComponent]
})
export class AppModule { }
