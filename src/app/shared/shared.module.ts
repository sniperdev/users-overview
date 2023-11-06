import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToolbarComponent} from "./components/toolbar/toolbar.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import { WrapperComponent } from './components/wrapper/wrapper.component';
import {MatCardModule} from "@angular/material/card";



@NgModule({
  declarations: [ToolbarComponent, WrapperComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatCardModule
  ],
  exports: [ToolbarComponent, WrapperComponent]
})
export class SharedModule { }
