export class ExchangeData {
  constructor(private exchange: number, private refreshDate: Date) { }

  GetExchange() {
    return this.exchange;
  }

  GetRefreshDate() {
    return this.refreshDate;
  }
}
