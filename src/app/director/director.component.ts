import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * @description Component representing the director info dialog.
 * @selector 'app-director'
 * @templateUrl './director.component.html'
 * @styleUrls ['./director.component.scss']
 */

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrl: './director.component.scss'
})
export class DirectorComponent implements OnInit {

  /**
   * @constructor - constructor for DirectorComponent
   * @param data - data containing the director information
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: { Director: any}) { }

  ngOnInit(): void {
    
  }
}
