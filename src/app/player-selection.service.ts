import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Player, Position} from "./shared/models/player.model";
import {Sort} from "@angular/material/sort";

@Injectable({
  providedIn: 'root'
})
export class PlayerSelectionService {
  playerSource: BehaviorSubject<Player[]> = new BehaviorSubject([
    new Player("Justin Jefferson", Position.WIDE_RECEIVER, 1, 1),
    new Player("Christian McCaffrey", Position.RUNNING_BACK, 1, 2),
    new Player("Ja'Marr Chase", Position.WIDE_RECEIVER, 1, 3),
    new Player("Austin Ekeler", Position.RUNNING_BACK, 1, 4),
    new Player("Tyreek Hill", Position.WIDE_RECEIVER, 1, 5),
    new Player("Travis Kelce", Position.TIGHT_END, 1, 6),
    new Player("Bijan Robinson", Position.RUNNING_BACK, 1, 7),
    new Player("Cooper Kupp", Position.WIDE_RECEIVER, 1, 8),
    new Player("Nick Chubb", Position.RUNNING_BACK, 1, 9),
    new Player("Saquan Barkley", Position.RUNNING_BACK, 2, 10),
    new Player("Stefon Diggs", Position.WIDE_RECEIVER, 2, 11),
    new Player("Tony Pollard", Position.RUNNING_BACK, 2, 12),
  ]);
  removedPlayerSource: BehaviorSubject<any> = new BehaviorSubject([]);
  constructor() { }

  removePlayer(index: number){
    //add clicked player to right side
    let oldList: Player[] = this.playerSource.value;
    let removed: Player = oldList[index];
    oldList.splice(index, 1);
    this.playerSource.next(oldList);

    //remove clicked player from left
    let oldRemovedList: Player[] = this.removedPlayerSource.value;
    oldRemovedList.push(removed);
    this.removedPlayerSource.next(oldRemovedList)
  }

  addPlayer(index: number){
    //add clicked player to right side
    let oldList: Player[] = this.removedPlayerSource.value;
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
}
