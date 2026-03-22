import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appCustomIf]',
})
export class CustomIf {
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input('appCustomIf') set appUnless(condition: boolean) {
    if (condition && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!condition && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
