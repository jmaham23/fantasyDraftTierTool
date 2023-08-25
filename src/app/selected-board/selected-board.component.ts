import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Player} from "../shared/models/player.model";
import {MatTable} from "@angular/material/table";
import {MatSortModule, Sort} from '@angular/material/sort';
import {PlayerSelectionService} from "../player-selection.service";

@Component({
  selector: 'app-selected-board',
  templateUrl: './selected-board.component.html',
  styleUrls: ['./selected-board.component.css']
})
export class SelectedBoardComponent implements AfterViewInit{
  players!: Player[];
  displayedColumns: string[] = ['name', 'position', 'tier', 'rank'];
  @ViewChild(MatTable) selectedBoard!: MatTable<Player>;
  constructor(private playerSelectionService: PlayerSelectionService) {
    this.players = [];
  }

  removeFromList(index: number, row: Player){
    this.playerSelectionService.addPlayer(index);
    console.log("Added Player:" + row.name);
    console.log("Player List Size: " + this.players.length)
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
     console.log(`Sorted ${sortState.direction}ending`);
    } else {
      console.log('Sorting cleared');
    }
  }

  ngAfterViewInit() {
    this.playerSelectionService.removedPlayerSource.subscribe(
        (selectedPlayers: Player[]) => {
          this.players = selectedPlayers;
          this.selectedBoard.renderRows();
        }
    );
  }
}
