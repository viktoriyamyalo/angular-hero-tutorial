import { Injectable } from '@angular/core';

import { Hero } from './hero';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { MessagesService } from './messages.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { InMemoryDataService } from './in-memory-data.service';

import { catchError, map, tap } from 'rxjs/operators';


@Injectable()
export class HeroService {

  getHeroes (): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(heroes => this.log(` fetched heroes`)),
        catchError(this.handleError('getHeroes', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error:any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of (result as T);
    };
  }

  getHero(id: number): Observable<Hero> {
      const url = `${this.heroesUrl}/${id}`;
      return this.http.get<Hero>(url).pipe(
        tap(_ => this.log(` fetched hero with the id ${id}`)),
        catchError(this.handleError<Hero>('getHero id=${id}'))
      );
  }

  updateHero(hero: Hero): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(` updated hero id ${hero.id}`)),
      catchError(this.handleError<any>('update hero'))
    );
  }

  constructor(
    private messagesService: MessagesService,
    private http: HttpClient,
    private inMemoryDataService: InMemoryDataService
  ) { }

  private log(message: string) {
    this.messagesService.add('HeroService' + message);
  }

  private heroesUrl = 'api/heroes';

  addHero(hero: Hero): Observable<Hero> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((hero: Hero) => this.log(` added hero w/ id ${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

deleteHero(hero: Hero | number): Observable<Hero> {
  const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  const id = typeof hero === 'number' ? hero : hero.id;
  const url = `${this.heroesUrl}/${id}`;
  
  return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(` deleted hero id ${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if(!term.trim()) {
      return of ([]);
    }

    return this.http.get<Hero[]>(`api/heroes/?name=${term}`).pipe(
      tap(_ => this.log(` found heroes matching ${term}`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

}
