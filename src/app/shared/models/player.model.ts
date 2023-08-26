// export class Player {
//   name: string;
//   position: Position;
//   tier: number;
//   rank: number;
//
//   constructor(name: string, position: Position, tier: number, rank: number) {
//     this.name = name;
//     this.position = position;
//     this.tier = tier;
//     this.rank = rank;
//   }
// }
//
// export enum Position {
//   QUARTER_BACK = "QB",
//   RUNNING_BACK = "RB",
//   WIDE_RECEIVER = "WR",
//   TIGHT_END = "TE"
// }

export class Player {
  constructor(rank: number, name: string, tier: number, position: Position, bestRank: number, worstRank: number, avgRank: number, stdDev: number) {
    this.rank = rank;
    this.name = name;
    this.tier = tier;
    this.position = position;
    this.bestRank = bestRank;
    this.worstRank = worstRank;
    this.avgRank = avgRank;
    this.stdDev = stdDev;
  }
  rank: number;
  name: string;
  tier: number;
  position: Position;
  bestRank: number;
  worstRank: number;
  avgRank: number;
  stdDev: number;
}

export enum Position {
  QUARTER_BACK = "QB",
  RUNNING_BACK = "RB",
  WIDE_RECEIVER = "WR",
  TIGHT_END = "TE"
}

