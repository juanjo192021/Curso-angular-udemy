import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SearchResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({

  providedIn: 'root'

})

export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 'QTYg1JTwXZq1CoJY9JCtWTEssnLP2ERM';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor( private http: HttpClient ){

    this.loadLocalStorage();

  }

  get tagsHistory(){

    return [...this._tagsHistory];

  }

  private organizeHistory(tag: string){
    tag = tag.toLowerCase();

    //Otra manera de realizar esto
    // if ( this._tagsHistory.includes(tag) ){
    //   this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag);
    // }
    // this._tagsHistory.unshift(tag);
    // this._tagsHistory = this.tagsHistory.splice(0,10);

    const index = this._tagsHistory.indexOf(tag);

    if (index !== -1) {
      this._tagsHistory.splice(index, 1);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.slice(0, 10);

    this.saveLocalStorage();
  }

  private saveLocalStorage():void{

    localStorage.setItem('history', JSON.stringify(this._tagsHistory));

  }

  private loadLocalStorage():void{

    if( !localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if( this._tagsHistory.length === 0) return;

    this.searchTag(this._tagsHistory[0]);

  }

  searchTag(tag: string):void{

    if( tag.length === 0 ) return;

    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key',this.apiKey)
      .set('limit','12')
      .set('q',tag)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search?`,{params})
      .subscribe( (resp) => {

        this.gifList = resp.data;

      })

    // async searchTag(tag: string):Promise<void>{
    //   const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=QTYg1JTwXZq1CoJY9JCtWTEssnLP2ERM&q=valorant&limit=10');
    //   const data = await resp.json();
    //   console.log(data);
    // }

    // fetch('https://api.giphy.com/v1/gifs/search?api_key=QTYg1JTwXZq1CoJY9JCtWTEssnLP2ERM&q=valorant&limit=10')
    //   .then( resp => resp.json())
    //   .then( data => console.log(data))

  }
}
