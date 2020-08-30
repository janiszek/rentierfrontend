import { RentLocation } from './locations';
import { Tenant } from './tenants';

// used for pagination
export class ContractPage {
    content: Contract[];
}

export class Contract {
    public id: number;
    public dateContract: string;
    public dateFrom: string;
    public dateTo: string;
    public location: RentLocation;
    public tenant: Tenant;

    constructor(id: number, dateContract: string, dateFrom: string, dateTo: string, locationID: number, tenantID: number) {
        this.id = id;
        this.dateContract = dateContract;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
        this.location = new RentLocation(0, null, null, null);
        this.tenant = new Tenant(0, null, null, null, null, null, null, null, null, null);
        this.location.id = locationID;
        this.tenant.id = tenantID;
    }
}
