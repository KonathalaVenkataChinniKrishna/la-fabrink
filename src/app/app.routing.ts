import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BargraphComponent } from './bargraph/bargraph.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { InteractionpageComponent } from './interactionpage/interactionpage.component';

export const AppRoutes: Routes = [{
  path: '',
  component: LandingpageComponent
},
{
  path: 'dashboard',
  component: DashboardComponent
},
{
  path: 'bargraph',
  component: BargraphComponent
},
{
  path: 'interaction',
  component: InteractionpageComponent
}];
