import { IExchangePoll } from "./IExchangePoll.model";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { ExchangeData } from "./ExchangeData.model";
import { Observable } from "rxjs";

export class CbrJson implements IExchangePoll {
  private readonly response: Observable<ExchangeData>;
  private exchange: number;
  private url: string;
  private isOk: boolean;

  constructor(private http: HttpClient, url: string) {
    this.url = url;
    this.response = this.http.get(this.url)
      .pipe(
        map(response => new ExchangeData(this.Deserialize(response), new Date())),
      );
    this.isOk = this.IsOk();
  }

  IsOk() {
    this.http.get(this.url, { observe: 'response' })
      .subscribe(res => this.isOk = res.statusText == 'OK');

    return this.isOk;
  }

  Deserialize(data) {
    this.exchange = data.Valute.EUR.Value;

    return this.exchange;
  }

  GetResponse() {
    return this.response;
  }
}
