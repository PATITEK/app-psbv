import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appResetPassword]'
})
export class ResetPasswordDirective {

  constructor(private _el: ElementRef) { }
  @HostListener('keyup', ['$event']) onKeyDown(e:any) {
     if(e.srcElement.maxLength === e.srcElement.value.lenght){
       e.preventDefault();
       let nextControl: any = e.srcElement.nextElementSibling;
       while (true){
         if(nextControl){
           if(nextControl.type === e.srcElement.type)
           {
             nextControl.focus();
             return;
           }
           else {
             nextControl = nextControl.nextElementSibling;
           }
          }
           else {
             return;
           }
         }
       }
     }
  

}
