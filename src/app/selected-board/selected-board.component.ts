import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Player} from "../shared/models/player.model";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatSort, MatSortModule, Sort} from '@angular/material/sort';
import {PlayerSelectionService} from "../player-selection.service";

@Component({
  selector: 'app-selected-board',
  templateUrl: './selected-board.component.html',
  styleUrls: ['./selected-board.component.css']
})
export class SelectedBoardComponent implements AfterViewInit{
  players: MatTableDataSource<Player> = new MatTableDataSource<Player>([]);
  displayedColumns: string[] = ['name', 'position', 'tier', 'rank'];
  @ViewChild(MatSort) sort!: MatSort
  constructor(private playerSelectionService: PlayerSelectionService, private changeDetector: ChangeDetectorRef) {
  }

  removeFromList(row: Player){
    this.playerSelectionService.addPlayer(row);
    console.log("Removed Player:" + row.name);
  }

  sortChange(sortState: Sort) {
    this.playerSelectionService.sort(sortState, true);
  }

  ngAfterViewInit() {
    this.playerSelectionService.removedPlayerSource.subscribe(
      (selectedPlayers: Player[]) => {
        this.players.data = selectedPlayers;
        this.players.sort = this.sort;
      }
    );
  }

  ngAfterViewChecked(){
    this.changeDetector.detectChanges();
  }
}
