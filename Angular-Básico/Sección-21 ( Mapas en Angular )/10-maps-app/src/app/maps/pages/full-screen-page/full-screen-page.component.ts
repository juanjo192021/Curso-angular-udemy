import { AfterViewInit, Component } from '@angular/core';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

(mapboxgl as any).accessToken = 'pk.eyJ1IjoianVhbmpvMTkyMDIxIiwiYSI6ImNsdnZlcjZndTF3OHYyaW8wMmdvZmdkNmIifQ.5pVySN_802V94V7U4P03RQ';

@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css'
})

//AfterViewInit: Despues que las vistas fueron inicializadas
export class FullScreenPageComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }

}
