import { NgModule } from "@angular/core";
import { StatisticsComponent } from './statistics.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

const ROUTER: Routes = [
    {path: '', component: StatisticsComponent}
]

@NgModule({
    declarations: [StatisticsComponent],
    imports: [RouterModule.forChild(ROUTER), CommonModule]
})
export class StatisticsModule {}