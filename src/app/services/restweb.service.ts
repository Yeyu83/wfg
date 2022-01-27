import { Data, Fields } from './../models/data.interface';
import { Token } from './../models/token.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Row } from '../models/row.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestwebService {
  constructor(
    private readonly http: HttpClient,
  ) { }

  public getToken(): Observable<Token> {
    const params = new HttpParams({
      fromObject: {
        grant_type: 'password',
        scope: 'uaa.user',
        username: environment.API.AUTH.USERNAME,
        password: environment.API.AUTH.PASSWORD,
      }
    });
    const headers = {
      'Authorization': `Basic ${btoa(`${environment.API.AUTH.CLIENT_ID}:${environment.API.AUTH.CLIENT_PASSWORD}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }
    return this.http.post<Token>(`${environment.API.URLS.ROOT}${environment.API.URLS.TOKEN}`, {}, { headers, params })
  }

  public getData(token: string): Observable<Row[]> {
    const headers = { 'Authorization': `Bearer ${token}` }
    const quotes = ['998089-4-1', '1222171-380-1', '1053247-380-1', '1213860-380-1','1213853-380-1']
    const params = new HttpParams({
      fromObject: {
        fields: ['LVAL_NORM', 'CLOSE_ADJ_NORM', 'NC2_PR_NORM', 'NC2_NORM', 'VOL', 'TUR', 'PY_CLOSE', 'YTD_PR_NORM']
      }
    });
    return this.http
      .get<Data>(`${environment.API.URLS.ROOT}${environment.API.URLS.QOUTES}/${quotes.join(',')}`, { headers, params })
      .pipe(
        map(data => data.quotes
          .filter(quote => Object.keys(quote.fields).length !== 0)
          .map(quote => this.mapData(quote.fields)
        )
      ))
  }

  private mapData(fields: Fields): Row {
    return {
      last: { value: fields.LVAL_NORM?.v, date: fields.LVAL_NORM?.d },
      close: { value: fields.CLOSE_ADJ_NORM?.v, date: fields.CLOSE_ADJ_NORM?.d },
      dayChangePercentage: fields.NC2_PR_NORM?.v,
      dayChange: fields.NC2_NORM?.v,
      volume: fields.VOL?.v,
      turnover: fields.TUR?.v,
      previousYearClose: { value: fields.PY_CLOSE?.v, date: fields.PY_CLOSE?.d },
      ytdPercentage: fields.YTD_PR_NORM?.v
    }
  }
}
