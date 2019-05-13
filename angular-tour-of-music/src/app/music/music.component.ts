import { Component, OnInit } from '@angular/core';

import { Song } from '../song';
import { MusicService } from '../music.service';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit {
  songs: Song[];

  constructor(private musicService: MusicService) { }

  ngOnInit() {
    this.getSongs();
  }

  getSongs(): void {
    this.musicService.getSongs()
    .subscribe(songs => this.songs = songs);
  }

  add(cancion: string): void {
    cancion = cancion.trim();
    if (!cancion) { return; }
    this.musicService.addSong({ cancion } as Song)
      .subscribe(song => {
        this.songs.push(song);
      });
  }

  delete(song: Song): void {
    this.songs = this.songs.filter(h => h !== song);
    this.musicService.deleteSong(song).subscribe();
  }

}