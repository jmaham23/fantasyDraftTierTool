import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AvailableBoardComponent } from './available-board/available-board.component';
import { SelectedBoardComponent } from './selected-board/selected-board.component';
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {HttpClientModule} from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    AvailableBoardComponent,
    SelectedBoardComponent
  ],
    imports: [
        BrowserModule,
        MatListModule,
        MatIconModule,
        MatTableModule,
        MatSortModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatCardModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
