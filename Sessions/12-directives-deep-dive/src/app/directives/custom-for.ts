import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appCustomFor]',
})
export class CustomFor {
  constructor(
    private templateRef: TemplateRef<any>,
    private vcr: ViewContainerRef
  ) {}

  @Input('appCustomForOf')
  set appMyForOf(collection: string[]) {
    this.vcr.clear(); // Clear existing views before re-rendering
    collection.forEach((item, index) => {
      // Create a new view for each item and pass context
      this.vcr.createEmbeddedView(this.templateRef, {
        $implicit: item,
        index: index
      });
    });
  }
}
