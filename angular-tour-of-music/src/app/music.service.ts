import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Song } from './song';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class MusicService {

  private songsUrl = 'api/songs';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET heroes from the server */
  getSongs (): Observable<Song[]> {
    return this.http.get<Song[]>(this.songsUrl)
      .pipe(
        tap(_ => this.log('fetched songs')),
        catchError(this.handleError<Song[]>('getSongs', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getHeroNo404<Data>(cantante: number): Observable<Song> {
    const url = `${this.songsUrl}/?cantante=${cantante}`;
    return this.http.get<Song[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} song cantante=${cantante}`);
        }),
        catchError(this.handleError<Song>(`getSong cantante=${cantante}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getSong(cantante: number): Observable<Song> {
    const url = `${this.songsUrl}/${cantante}`;
    return this.http.get<Song>(url).pipe(
      tap(_ => this.log(`fetched song cantante=${cantante}`)),
      catchError(this.handleError<Song>(`getSong cantante=${cantante}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchSongs(term: string): Observable<Song[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Song[]>(`${this.songsUrl}/?cancion=${term}`).pipe(
      tap(_ => this.log(`found songs matching "${term}"`)),
      catchError(this.handleError<Song[]>('searchSongs', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addSong (song: Song): Observable<Song> {
    return this.http.post<Song>(this.songsUrl, song, httpOptions).pipe(
      tap((newSong: Song) => this.log(`added song w/ cantante=${newSong.cantante}`)),
      catchError(this.handleError<Song>('addSong'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteSong (song: Song | number): Observable<Song> {
    const id = typeof song === 'number' ? song : song.cantante;
    const url = `${this.songsUrl}/${id}`;

    return this.http.delete<Song>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted song cantante=${id}`)),
      catchError(this.handleError<Song>('deleteSong'))
    );
  }

  /** PUT: update the hero on the server */
  updateSong (song: Song): Observable<any> {
    return this.http.put(this.songsUrl, song, httpOptions).pipe(
      tap(_ => this.log(`updated song cantante=${song.cantante}`)),
      catchError(this.handleError<any>('updateCantante'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`MusicService: ${message}`);
  }
}