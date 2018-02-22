import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Heroe } from '../interfaces/heroe.interfaces';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class HeroesService {

  heroesUrl: string = "https://heroesapp-88e23.firebaseio.com/heroes.json";
  heroeUrl: string = "https://heroesapp-88e23.firebaseio.com/heroes/";

  constructor(private http: Http) { }

  nuevoHeroe(heroe: Heroe): Observable<any> {

    let body = JSON.stringify(heroe);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.heroesUrl, body, { headers }).map(
      res => {
        console.log(res.json());
        return res.json();
      }
    )

  }

  actualizarHeroe(heroe: Heroe, key$: string): Observable<any> {

    let body = JSON.stringify(heroe);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let url = `${this.heroeUrl}/${key$}.json`

    return this.http.put(url, body, { headers }).map(
      res => {
        console.log(res.json());
        return res.json();
      }
    )

  }

  getHeroe(key$: string) {

    let url = `${this.heroeUrl}/${key$}.json`;
    return this.http.get(url).map(
      res => res.json()
    );
  }

  getHeroes() {
    return this.http.get( this.heroesUrl ).map(
      res => res.json()
    );
  }

  borrarHeroeService( key$:string ){

    let url = `${this.heroeUrl}/${key$}.json`;
    return this.http.delete( url ).map( res => res.json() )

  }

}
