// used for pagination
export class RentLocationPage {
    content: RentLocation[];
}

export class RentLocation {
    public id: number;
    public shortName: string;
    public address: string;
    public photoRef: string;

    constructor(id: number, shortName: string, address: string, photoRef: string) {
        this.id = id;
        this.shortName = shortName;
        this.address = address;
        this.photoRef = photoRef;
    }
}
