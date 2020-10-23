import { Observable } from "rxjs";
import { ExchangeData } from "./ExchangeData.model";

export interface IExchangePoll {
  IsOk(): boolean;
  Deserialize(data: any): number;
  GetResponse(): Observable<ExchangeData>;
}
