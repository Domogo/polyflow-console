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

  tooltipHidden = true

  constructor() { }

  ngOnInit(): void {
  }

  _getIcon() {
    if(!this.iconQuery) { return 'undefined' }
    
    const icon =  getIcon(this.type, this.iconQuery)
    if(icon) {
      return icon
    } else {
      return 'https://friconix.com/jpg/fi-cnsuxl-question-mark.jpg'
    }
  }

  _getNetworkQuery() {
    return getNetwork(parseInt(this.iconQuery!))
  }

  mouseEnter() {
    this.tooltipHidden = false
  }

  mouseLeave() {
    this.tooltipHidden = true
  }

}

type Size = 'xs' | 'sm' | 'base' | 'lg'
