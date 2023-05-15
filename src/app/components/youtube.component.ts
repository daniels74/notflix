import { Component, Input, OnInit } from "@angular/core";

@Component({
    template: '<youtube-player videoId="BZGnJImTlfw" ></youtube-player>',
    selector: 'youtube-player-example',
  })

  export class YoutubePlayerExample implements OnInit {

    @Input() videoId!: string;

    ngOnInit() {
      // This code loads the IFrame Player API code asynchronously, according to the instructions at
      // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
      const tag = document.createElement('script');
  
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
    }
  } 