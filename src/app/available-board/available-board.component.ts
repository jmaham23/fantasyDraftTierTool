import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource, MatTableDataSourcePaginator} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {Player} from "../shared/models/player.model";
import {PlayerSelectionService} from "../player-selection.service";

@Component({
  selector: 'app-available-board',
  templateUrl: './available-board.component.html',
  styleUrls: ['./available-board.component.css'],
})
export class AvailableBoardComponent implements AfterViewInit{
  players: MatTableDataSource<Player> = new MatTableDataSource<Player>([]);
  displayedColumns: string[] = ['name', 'position', 'tier', 'rank'];
  @ViewChild(MatSort) sort!: MatSort
  constructor(private playerSelectionService: PlayerSelectionService, private changeDetector: ChangeDetectorRef) {
  }

  removeFromList(row: Player){
    this.playerSelectionService.removePlayer(row);
    console.log("Removed Player:" + row.name);
  }

  sortChange(sortState: Sort) {
    this.playerSelectionService.sort(sortState, true);
  }

  ngAfterViewInit() {
    this.playerSelectionService.playerSource.subscribe(
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
