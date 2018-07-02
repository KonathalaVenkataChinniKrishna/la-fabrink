import { NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';

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

  public getContextCountsData() {
    return this.http.get('http://localhost:8081/lafabryik/contextCounts');
  }

  public getInteractionData() {
    return this.http.get('http://localhost:8081/lafabryik/interactions');
  }

  public getInteractionDendoData() {
    return this.http.get('http://localhost:8081/lafabryik/interactionsdendo');
  }

  public getBotReply(usermsg: string) {
    console.log('Hello baby ' + usermsg);
    const url = 'http://localhost:6060/ask_bot/'+ usermsg;
    console.log(url);
    return this.http.get(url);
  }

 }
