import { Directive, ElementRef, HostListener  } from '@angular/core';

@Directive({
  selector: '[gloww]',
})

export class glowDirective {
  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('1px 1px 15px 5px #ff0000');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.boxShadow = color;

  }
}
