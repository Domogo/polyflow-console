import { Component, Input, OnInit } from '@angular/core';
import { getIcon, IconType } from '../../graphics/icons';

@Component({
  selector: 'app-icon-item-holder',
  templateUrl: './icon-item-holder.component.html',
  styleUrls: ['./icon-item-holder.component.css']
})
export class IconItemHolderComponent implements OnInit {

  @Input() type!: IconType
  @Input() iconQuery!: string | undefined
  @Input() showQuery: boolean = false
  @Input() size: Size = 'xs'
  @Input() color = 'slate-700'

  constructor() { }

  ngOnInit(): void {
  }

  _getIcon() {
    if(!this.iconQuery) { return 'undefined' }
    return getIcon(this.type, this.iconQuery)
  }

}

type Size = 'xs' | 'sm' | 'base' | 'lg'
