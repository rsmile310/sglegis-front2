import { NgModule } from '@angular/core';
import { RelativeTimePipe } from './relative-time.pipe';
import { ExcerptPipe } from "./excerpt.pipe";
import { UppercaseDirective } from './upper-case.pipe';
@NgModule({
  declarations: [
    RelativeTimePipe,
    ExcerptPipe,
    UppercaseDirective
  ],
  exports: [
    RelativeTimePipe,
    ExcerptPipe,
    UppercaseDirective
  ]
})
export class CommonPipesModule { }