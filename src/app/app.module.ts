import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
    imports: [CommonModule, LayoutComponent],
    exports: [LayoutComponent]
})
export class LayoutModule { }
