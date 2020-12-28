import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html'
})
export class ArtistComponent {

  artista: any = {};
  tracks: any[] = []
  loading: boolean;
  constructor (
    private _activatedRoute: ActivatedRoute,
    private _spotify: SpotifyService) {
      this.loading = true
    this._activatedRoute.params.subscribe(params => {
      console.log(params['id'])
      this.getArtista(params['id'])
      this.getTopTracks(params['id'])
    })
  }

  getArtista (id: string) {
    this.loading = true
    this._spotify.getArtista(id).subscribe(artista => {
      // console.log(artista)
      this.artista = artista
      this.loading = false
    })
  }

  getTopTracks (id: string) {
    this._spotify.getTopTracks(id).subscribe(data => {
      console.log(data)
      this.tracks = data
    })
  }

}
