import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BargraphComponent } from './bargraph/bargraph.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { InteractionpageComponent } from './interactionpage/interactionpage.component';
import { InteractionpagedendoComponent } from './interactionpagedendo/interactionpagedendo.component';
import { ChatbotpageComponent } from './chatbotpage/chatbotpage.component';
import { IframeComponent } from './iframepage/iframe.component';

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
},
{
  path: 'interactiondendo',
  component: InteractionpagedendoComponent
},
{
  path: 'chatbot',
  component: ChatbotpageComponent
},
{
  path: 'iframe',
  component: IframeComponent
}];
