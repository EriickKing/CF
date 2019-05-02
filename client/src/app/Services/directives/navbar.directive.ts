import { Directive, HostListener, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { SharedService } from '../shared.service';

@Directive({
  selector: '[navScroll]'
})

export class NavBarDirective implements OnInit {
  config = localStorage.getItem("config_nav");
  constructor(
    private elementRef: ElementRef,
    private render: Renderer2,
    private sharedService: SharedService
  ) { }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number > 200) {
      localStorage.setItem("config_nav", 'true')
      this.config = localStorage.getItem("config_nav");
      this.sharedService.changeConfig2(this.config);
    } else {
      localStorage.setItem("config_nav", 'false')
      this.config = localStorage.getItem("config_nav");
      this.sharedService.changeConfig2(this.config);
    }
    if (number > 200 && this.elementRef.nativeElement.id === 'list') {
      this.render.addClass(this.elementRef.nativeElement, 'display')
    } else {
      this.render.removeClass(this.elementRef.nativeElement, 'display')
    }
  }

  ngOnInit() { 
  }
}