import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.css']
})
export class CampaignDetailsComponent implements OnInit {

  filterName: string = this.route.snapshot.params['filterName']
  filterType: string = this.route.snapshot.params['filterType']

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
