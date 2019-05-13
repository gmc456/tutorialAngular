import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Song }         from '../song';
import { MusicService }  from '../music.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  @Input() song: Song;

  constructor(
    private route: ActivatedRoute,
    private musicService: MusicService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getSong();
  }

  getSong(): void {
    const cantante = +this.route.snapshot.paramMap.get('cantante');
    this.musicService.getSong(cantante)
      .subscribe(song => this.song = song);
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    this.musicService.updateSong(this.song)
      .subscribe(() => this.goBack());
  }
}
