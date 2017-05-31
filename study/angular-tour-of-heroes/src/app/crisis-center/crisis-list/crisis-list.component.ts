import { Crisis } from '../crisis';
import { CrisisService } from '../crisis.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-crisis-list',
  templateUrl: './crisis-list.component.html',
  styleUrls: ['./crisis-list.component.css']
})
export class CrisisListComponent implements OnInit {
  selectedId: number;

  constructor(private service: CrisisService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }

  onSelect(crisis: Crisis) {
    this.selectedId = crisis.id;
    this.router.navigate([crisis.id], { relativeTo: this.route });
  }
}
