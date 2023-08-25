export class Player {
  name: string;
  position: Position;
  tier: number;
  rank: number;

  constructor(name: string, position: Position, tier: number, rank: number) {
    this.name = name;
    this.position = position;
    this.tier = tier;
    this.rank = rank;
  }
}

export enum Position {
  QUARTER_BACK = "QB",
  RUNNING_BACK = "RB",
  WIDE_RECEIVER = "WR",
  TIGHT_END = "TE"
}


