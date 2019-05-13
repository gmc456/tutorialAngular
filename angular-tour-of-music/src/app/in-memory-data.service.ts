import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Song } from './song';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const songs = [
      { cantante: 1, cancion: 'Hijo de la luna'},
      { cantante: 2, cancion: 'Adios le pido'},
      { cantante: 3, cancion: 'No me doy por vencido'},
      { cantante: 4, cancion: 'Y nos dieron las diez'},
      { cantante: 5, cancion: 'Corazon partío'},  
    ];
    return {songs};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(songs: Song[]): number {
    return songs.length > 0 ? Math.max(...songs.map(song => song.cantante)) + 1 : 11;
  }
}