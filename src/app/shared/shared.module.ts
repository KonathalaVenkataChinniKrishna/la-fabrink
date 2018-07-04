import { NgModule } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

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

  public getQuestions() {
    return this.http.get('http://40.117.131.214:5000/getQueries');
  }

  public postAnswers(submitStr: string) {
    const options = new RequestOptions();
    options.headers = new Headers();
    options.headers.append('Content-Type', 'application/json');
    return this.http.post('https://vikas-projects.appspot.com/api/reply', JSON.parse(submitStr), options);
  }

  public getBotReply(question: string) {
    // const options = new RequestOptions();
    // options.headers = new Headers();
    // options.headers.append('Content-Type', 'application/json');
    // return this.http.post('https://vikas-projects.appspot.com/api/reply', JSON.stringify(question), options);
    // console.log('Hello baby ' + usermsg);
    const url = 'http://localhost:6060/ask_bot/' + question;
    console.log(url);
    return this.http.get(url);
  }

 }
