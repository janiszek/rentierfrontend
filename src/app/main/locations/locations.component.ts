import { Component, OnInit } from '@angular/core';
import { LocationsService } from 'src/app/Services/Locations/locations.service';
import { RentLocation } from 'src/app/Model/locations';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  locationList: RentLocation[];

  constructor(private locationService: LocationsService) { }

  ngOnInit(): void {
    this.locationService.getLocations().subscribe(locations => {
      this.locationList = locations;
    });
  }

}
