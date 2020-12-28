import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
    console.log('spotify service listo')
  }

  token: string = 'BQCxVLW-bkZhvoAQ2CKUPQPiWmdpuAnr-djFJvzdNNDZWOlK1MWUY-mrzILW08vVApPs-7dTtH8ZiVM_hKw'
  // token: BQBuZizpTl0HAWRho3KtOWpgIg-sLzy7xGp6VTm4Y5oWIYxlVROi5osRGteuG61KSQsiysgGlIYEPhDoI50

  getQuery (query: string) {
    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
    return this.http.get(url, { headers });
  }

  getNewRelease () {
    return this.getQuery('browse/new-releases?limit=20')
      .pipe(map((data: any) => data['albums'].items ))
  }

  getArtistas (termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
     .pipe(map((data: any) => data['artists'].items ))
  }

  getArtista (id: string) {
    return this.getQuery(`artists/${id}`)
  }

  getTopTracks (id: string) {
    return this.getQuery(`artists/${id}/top-tracks?market=es`)
     .pipe(map((data: any) => data['tracks'] ))
  }
}
