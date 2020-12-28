import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  nuevasCanciones: any[] = [];
  loading: boolean;
  error: boolean;
  mensajeError: string;

  constructor(private spotify: SpotifyService) {
    this.loading = true
    this.error = false
    this.mensajeError = ''
    this.spotify.getNewRelease()
      .subscribe(
        (data: any) => {
        console.log(data)
        this.nuevasCanciones = data
        this.loading = false
      }, (errorServicio) => {
        this.loading = false
        this.error = true
        console.log(errorServicio.error.error.message)
        this.mensajeError = errorServicio.error.error.message
      })
  }

  ngOnInit(): void {
  }

}
