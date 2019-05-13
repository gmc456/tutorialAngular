import { Component, OnInit } from '@angular/core';
import { Song } from '../song';
import { MusicService } from '../music.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  songs: Song[] = [];

  constructor(private musicService: MusicService) { }

  ngOnInit() {
    this.getSongs();
  }

  getSongs(): void {
    this.musicService.getSongs()
      .subscribe(songs => this.songs = songs.slice(1, 5));
  }
}