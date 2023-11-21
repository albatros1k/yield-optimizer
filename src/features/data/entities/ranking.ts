interface Address {
  username: string;
  id: string;
  avatar: string;
  address: string;
  solanaAddress: string;
  aptosAddress: string;
  seiAddress: string;
  twitterUserName: string;
  discordUserName: string;
}

interface Space {
  name: string;
}

export interface UserRanking {
  id: string;
  rank: number;
  points: number;
  space?: Space;
  address: Address;
}
