import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
/* A way to tell TypeScript that the order_id is of type any. */

  order_id: any;
  constructor( private route:ActivatedRoute) { }

/**
 * The ngOnInit() function is called after the constructor and after the first ngOnChanges() function. 
 * a good place to put initialization logic
 */
  ngOnInit(): void {
    this.order_id =this.route.snapshot.paramMap.get("order_id") || "";

    console.log("---------", this.order_id)
  }

}
