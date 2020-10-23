import { Component, OnInit} from '@angular/core';
import {ExchangePollingService} from "../services/exchange-polling.service";
import { Observable } from "rxjs";
import { ExchangeData } from "../models/ExchangeData.model";

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange-rate.component.sass']
})
export class ExchangeComponent implements OnInit {
  public exchangeData: Observable<ExchangeData>;

  constructor(private _exchangePollingService: ExchangePollingService) {}

  ngOnInit(): void {
    this.exchangeData = this._exchangePollingService.getExchange();
  }
}
