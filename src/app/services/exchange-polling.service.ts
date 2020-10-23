import { Injectable } from '@angular/core';
import {Observable, timer, throwError, from, interval} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {switchMap, retry, catchError, first, concatMap, map, tap} from 'rxjs/operators';
import { CbrXml } from "../models/CbrXml.model";
import { CbrJson } from "../models/CbrJson.model";
import { ExchangeData } from "../models/ExchangeData.model";

@Injectable()
export class ExchangePollingService{

  private readonly exchange: any;
  private sources: any[];

  constructor(private http: HttpClient) {
    this.sources = [
      new CbrXml(http, 'https://www.cbr-xml-daily.ru/daily_utf8.xml'),
      new CbrJson(http, 'https://www.cbr-xml-daily.ru/daily_json.js'),
    ];

    this.exchange = timer(300, 10000)
      .pipe(
        switchMap(() => from(this.sources)
          .pipe(
            first(source => source.IsOk()),
            concatMap((source) => source.GetResponse()),
            catchError(() => throwError('Something wrong in exchange polling')
              .pipe(retry())
            )
          )
        )
      )
  }

  getExchange(): Observable<ExchangeData> {
    return this.exchange;
  }
}
