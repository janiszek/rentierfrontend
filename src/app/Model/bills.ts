import { NumberValueAccessor } from '@angular/forms';
import { RentLocation } from './locations';

class BillGroup{
    public id: number;
    public description: string;
    public fixed: boolean;
}

export enum billType {
    FORECAST,
    REAL,
    PAID
  }

export class Bill {
    public id: number;
    public date: string;
    public amount: number;
    public status: billType;
    public location: RentLocation;
    public billGroup: BillGroup;

    constructor(id: number, date: string, amount: number, status: billType, locationID: number, billGroupID: number) {
        this.id = id;
        this.date = date;
        this.amount = amount;
        this.status = status;
        this.location = new RentLocation(0, null, null, null);
        this.billGroup = new BillGroup();

        this.location.id = locationID;
        this.billGroup.id = billGroupID;
    }
}
