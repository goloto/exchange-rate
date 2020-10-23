import { IExchangePoll } from "./IExchangePoll.model";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { parseString } from "xml2js";
import { ExchangeData } from "./ExchangeData.model";
import { Observable } from "rxjs";

export class CbrXml implements IExchangePoll {
  private readonly response: Observable<ExchangeData>;
  private exchange: number;
  private url: string;
  private isOk: boolean;

  constructor(private http: HttpClient, url: string) {
    this.url = url;
    this.response = this.http.get(this.url, { responseType: 'text' })
      .pipe(
        map(response => new ExchangeData(this.Deserialize(response), new Date())),
      );
    this.isOk = this.IsOk();
  }

  IsOk() {
    this.http.get(this.url, { observe: 'response', responseType: 'text' })
      .subscribe(res => this.isOk = res.statusText == 'OK');

    return this.isOk;
  }

  Deserialize(data) {
    parseString(data, (error, result) => {
      for (let currency of result.ValCurs.Valute) {
        if (currency.CharCode[0] === 'EUR') this.exchange = currency.Value[0];
      }
    });

    return this.exchange;
  }

  GetResponse() {
    return this.response;
  }
}
