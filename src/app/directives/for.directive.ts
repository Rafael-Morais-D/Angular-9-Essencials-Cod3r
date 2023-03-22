import { Directive, OnInit, Input, ViewContainerRef, TemplateRef } from '@angular/core';

@Directive({
  selector: '[myFor]'
})
export class ForDirective implements OnInit {

  constructor(
    private container: ViewContainerRef,
    private template: TemplateRef<any>) {
    this.numbers = []
  }

  @Input('myForEm') numbers: number[]

  ngOnInit(): void {
    for (let number of this.numbers) {
      this.container.createEmbeddedView(
        this.template, { $implicit: number }
      );
    }
  }

}
