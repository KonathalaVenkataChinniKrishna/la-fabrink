import { NgModule } from '@angular/core';
import { Http } from '@angular/http';

@NgModule({
  declarations: [],
  exports:      [],
  providers: 	[]
})
export class SharedModule {

  constructor(private http: Http) {
  }

  public getDashboardData() {
    return this.http.get('http://localhost:8081/lafabryik/dashboard');
  }

  public getTalkCountsData() {
    return this.http.get('http://localhost:8081/lafabryik/talkCounts');
  }

  public getInteractionData() {
    return this.http.get('http://localhost:8081/lafabryik/interactions');
  }

  public getInteractionDendoData() {
    return this.http.get('http://localhost:8081/lafabryik/interactionsdendo');
  }

  public getBotReply(usermsg: string) {
    return this.http.get('http://localhost:5000/ask_bot/', usermsg);
  }

 }
