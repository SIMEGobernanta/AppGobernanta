export class RoomInfo {
  name!: string;
  contactName!: string;
  adults!: number;
  kids!: number;
  babies!: number;
  cradles!: number;
  startDate!: Date;
  endDate!: Date;
  houseKeeping!: HouseKeeping;
  blocked!: boolean;
}

export enum HouseKeeping {
    Clean = 'CLEAN',
    Dirty = 'DIRTY',
    pendingReview = 'PENDING_REVIEW'
}
