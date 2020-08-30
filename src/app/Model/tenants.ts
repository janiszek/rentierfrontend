// used for pagination
export class TenantPage {
    content: Tenant[];
}

class TenantDetails{
    public id: number;
    public firstName: string;
    public lastName: string;
    public pesel: string;
    public documentId: string;
    public address: string;
    public email: string;
    public phone: string;
    public description: string;
}

export class Tenant {
    public id: number;
    public shortName: string;
    public details: TenantDetails;

    constructor(id: number, shortName: string, firstName: string, lastName: string, pesel: string, documentId: string,
                address: string, email: string, phone: string, description: string) {
        this.id = id;
        this.shortName = shortName;
        this.details = new TenantDetails();
        this.details.id = 0;
        this.details.firstName = firstName;
        this.details.lastName = lastName;
        this.details.pesel = pesel;
        this.details.documentId = documentId;
        this.details.address = address;
        this.details.email = email;
        this.details.phone = phone;
        this.details.description = description;
    }
}
