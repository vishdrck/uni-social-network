import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'svg-icon',
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.scss']
})
export class SvgIconComponent implements OnInit {
  @Input() icon = '';
  svgContent: string;
  @Input() customParentCss: string;
  @Input() customSVGCss;
  svgPath = '/assets/svg/icons';
  constructor() {
    this.svgContent = '';
    this.customParentCss = '';
    this.customSVGCss = '';
  }

  ngOnInit(): void {
    this.svgContent = ``;
  }

}
