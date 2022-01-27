import { RestwebService } from './services/restweb.service';
import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, finalize, switchMap } from 'rxjs/operators'
import { Row } from './models/row.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public readonly NO_ROWS_MESSAGE = 'The are no rows available for the request'

  public messageAvailable = false

  public rows$: Observable<Row[]>

  constructor(
    private restwebService: RestwebService
  ) { }

  ngOnInit(): void {
    this.rows$ = this.restwebService.getToken()
      .pipe(
        catchError(err => {
          window.alert(`Failed to get the access token! -> ${JSON.stringify(err)}`)
          return EMPTY
        }),
        switchMap(token => this.restwebService.getData(token.access_token)),
        catchError(err => {
          window.alert(`Failed to get the data! -> ${JSON.stringify(err)}`)
          return EMPTY
        }),
        finalize(() => {
          this.messageAvailable = true
        })
      )
  }
}
