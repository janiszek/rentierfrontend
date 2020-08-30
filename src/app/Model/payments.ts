import { RentLocation } from './locations';
import { Tenant } from './tenants';

export enum paymentType {
    FORECAST,
    CHARGED
  }

// used for pagination
export class PaymentPage {
    content: Payment[];
}

export class Payment {
    public id: number;
    public date: string;
    public amount: number;
    public status: paymentType;
    public location: RentLocation;
    public tenant: Tenant;



    constructor(id: number, date: string, amount: number, status: paymentType, locationID: number, tenantID: number) {
        this.id = id;
        this.date = date;
        this.amount = amount;
        this.status = status;
        this.location = new RentLocation(0, null, null, null);
        this.tenant = new Tenant(0, null, null, null, null, null, null, null, null, null);
        this.location.id = locationID;
        this.tenant.id = tenantID;
    }
}
