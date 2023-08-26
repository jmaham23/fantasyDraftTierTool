import {Injectable} from '@angular/core';
import {BehaviorSubject, map, mergeAll} from "rxjs";
import {Player, Position} from "./shared/models/player.model";
import {Sort} from "@angular/material/sort";
import {HttpClient, HttpResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PlayerSelectionService {
  endpoint: string = "https://sheets.googleapis.com/v4/spreadsheets/";
  sheet_id: string = "1aeCDrRHeqY2oLdrcqfirsl4bjca3pcjUg3RP5fJrtyc";
  api_key: string = "";

  playerSource: BehaviorSubject<Player[]> = new BehaviorSubject<Player[]>([]);

  // playerSource: BehaviorSubject<Player[]> = new BehaviorSubject([
  //   new Player("Justin Jefferson", Position.WIDE_RECEIVER, 1, 1),
  //   new Player("Christian McCaffrey", Position.RUNNING_BACK, 1, 2),
  //   new Player("Ja'Marr Chase", Position.WIDE_RECEIVER, 1, 3),
  //   new Player("Austin Ekeler", Position.RUNNING_BACK, 1, 4),
  //   new Player("Tyreek Hill", Position.WIDE_RECEIVER, 1, 5),
  //   new Player("Travis Kelce", Position.TIGHT_END, 1, 6),
  //   new Player("Bijan Robinson", Position.RUNNING_BACK, 1, 7),
  //   new Player("Cooper Kupp", Position.WIDE_RECEIVER, 1, 8),
  //   new Player("Nick Chubb", Position.RUNNING_BACK, 1, 9),
  //   new Player("Saquan Barkley", Position.RUNNING_BACK, 2, 10),
  //   new Player("Stefon Diggs", Position.WIDE_RECEIVER, 2, 11),
  //   new Player("Tony Pollard", Position.RUNNING_BACK, 2, 12),
  // ]);
  removedPlayerSource: BehaviorSubject<any> = new BehaviorSubject([]);
  constructor(private httpClient: HttpClient) {
    this.updatePlayerList();
  }

  removePlayer(row: Player){
    //add clicked player to right side
    let oldList: Player[] = this.playerSource.value;
    let index = oldList.indexOf(row);
    let removed: Player = oldList[index];
    oldList.splice(index, 1);
    this.playerSource.next(oldList);

    //remove clicked player from left
    let oldRemovedList: Player[] = this.removedPlayerSource.value;
    oldRemovedList.push(removed);
    this.removedPlayerSource.next(oldRemovedList)
  }

  addPlayer(row: Player){
    //add clicked player to right side
    let oldList: Player[] = this.removedPlayerSource.value;
    let index = oldList.indexOf(row);
    let removed: Player = oldList[index];
    oldList.splice(index, 1);
    this.removedPlayerSource.next(oldList);

    //remove clicked player from left
    let oldRemovedList: Player[] = this.playerSource.value;
    oldRemovedList.push(removed);
    this.playerSource.next(oldRemovedList)
  }

  sort(sort: Sort, availablePlayers: boolean){
    let data!: Player[];
    //sort the available players
    if(availablePlayers){
      data = this.playerSource.value;
    }
    else{
      data = this.removedPlayerSource.value;
    }

    if (!sort.active || sort.direction === '') {
      this.setPlayerSource(data, availablePlayers);
      return;
    }
    data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      console.log(sort.active);
      switch (sort.active) {
        case "name":
          return this.compare(a.name, b.name, isAsc);
        case "position":
          return this.compare(a.position, b.position, isAsc);
        case "tier":
          return this.compare(a.tier, b.tier, isAsc);
        case "rank":
          return this.compare(a.rank, b.rank, isAsc);
        default:
          return 0;
      }
    });

    this.setPlayerSource(data, availablePlayers);
  }

 private setPlayerSource(players: Player[], availablePlayers: boolean) {
    if(availablePlayers){
      this.playerSource.next(players);
    }
    else{
      this.removedPlayerSource.next(players);
    }
  }

  private compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  // updatePlayerList() {
  //   const url = this.endpoint + this.sheet_id + "/values/Half PPR?key=" + this.api_key;
  //   this.httpClient.get<Player[]>(url).subscribe(result =>  {
  //     const filteredResult = result.slice(2);
  //     this.playerSource.next(filteredResult);
  //     console.log(JSON.stringify(this.playerSource.value));
  //   });
  //   console.log(JSON.stringify(this.playerSource.value));
  // }

  updatePlayerList() {
    console.log("Calling API");
    const url = this.endpoint + this.sheet_id + "/values/Half PPR?key=" + this.api_key;
    this.httpClient.get<any>(url).subscribe(response => {
      const values = response.values;
      if (values && values.length >= 3) {
        const filteredResult = values.slice(1);
        const players: Player[] = filteredResult.map((row: string[]) => {
          return new Player(
            parseInt(row[0]),
            row[1],
            parseInt(row[2]),
            row[3] as Position,
            parseFloat(row[4]),
            parseFloat(row[5]),
            parseFloat(row[6]),
            parseFloat(row[7])
          );
        });
        this.playerSource.next(players);
      } else {
        console.error('Data is not in the expected format or does not have enough rows.');
      }
    });
  }
}
