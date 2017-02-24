import { Directive, ElementRef, Input } from '@angular/core';


@Directive({ 
    selector: '[small-font]' 
})

export class SmallFontDirective {

    constructor(el: ElementRef) {
       el.nativeElement.style.fontSize = 'small';
       el.nativeElement.style.color = "#369";
    }
}