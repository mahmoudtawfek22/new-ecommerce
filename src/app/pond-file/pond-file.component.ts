import { Component, ViewChild } from '@angular/core';
import { FilePondOptions } from 'filepond';
import { FilePondComponent, FilePondModule } from 'ngx-filepond';

@Component({
  selector: 'app-pond-file',
  standalone: true,
  imports: [FilePondModule],
  templateUrl: './pond-file.component.html',
  styleUrl: './pond-file.component.css',
})
export class PondFileComponent {
  @ViewChild('myPond') myPond!: FilePondComponent;

  pondOptions: FilePondOptions = {
    allowMultiple: true,
    labelIdle: 'Drop files here...',
  };

  pondFiles: FilePondOptions['files'] = [
    {
      source: 'assets/photo.jpeg',
      options: {
        type: 'local',
      },
    },
  ];

  pondHandleInit() {
    console.log('FilePond has initialised', this.myPond);
  }

  pondHandleAddFile(event: any) {
    console.log('A file was added', event);
  }

  pondHandleActivateFile(event: any) {
    console.log('A file was activated', event);
  }
}
