import { Component, Input, OnInit } from '@angular/core';
import { getIcon, IconType } from '../../graphics/icons';
import { getNetwork } from '../../networks';

@Component({
  selector: 'app-icon-item-holder',
  templateUrl: './icon-item-holder.component.html',
  styleUrls: ['./icon-item-holder.component.css']
})
export class IconItemHolderComponent implements OnInit {

  @Input() type!: IconType
  @Input() iconQuery!: string | undefined
  @Input() showQuery: boolean = false
  @Input() size: Size | string = 'xs'
  @Input() color = 'slate-700'

  constructor() { }

  ngOnInit(): void {
  }

  _getIcon() {
    if(!this.iconQuery) { return 'undefined' }
    return getIcon(this.type, this.iconQuery)
  }

  _getNetworkQuery() {
    return getNetwork(parseInt(this.iconQuery!))
  }

}

type Size = 'xs' | 'sm' | 'base' | 'lg'
