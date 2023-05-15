// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-videoplayer',
//   templateUrl: './videoplayer.component.html',
//   styleUrls: ['./videoplayer.component.scss']
// })
// export class VideoplayerComponent {

// }


import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-videoplayer',
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.scss']
})

export class VideoPlayerComponent implements OnInit {
  private apiLoaded = false;

  // @Input() videoId!: string;

  constructor() { }

  ngOnInit(): void {
    if(!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
     this.apiLoaded = true;
   }
  }
}
