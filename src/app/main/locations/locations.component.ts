import { Component, OnInit } from '@angular/core';
import { LocationsService } from 'src/app/Services/Locations/locations.service';
import { RentLocation, RentLocationPage } from 'src/app/Model/locations';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  /*locationList: RentLocation[];*/
  locationPage: RentLocationPage;

  constructor(private locationService: LocationsService) { }

  ngOnInit(): void {
    // use the pagination by default
    this.locationService.getLocations().subscribe(locationPage => {
      this.locationPage = locationPage;
    });
  }

}
