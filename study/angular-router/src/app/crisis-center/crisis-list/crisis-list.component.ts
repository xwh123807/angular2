import { Crisis, CrisisService } from '../crisis.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-crisis-list',
  templateUrl: './crisis-list.component.html',
  styleUrls: ['./crisis-list.component.css']
})
export class CrisisListComponent implements OnInit {
  crises: Observable<Crisis[]>;

  selectedId: number;

  constructor(
    private service: CrisisService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.crises = this.route.params.switchMap((params: Params) => {
      this.selectedId = +params['id'];
      return this.service.getCrises();
    });
  }

  isSelected(crisis: Crisis) {
    return this.selectedId === crisis.id;
  }

  onSelect(crisis: Crisis) {
    this.selectedId = crisis.id;
    this.router.navigate([crisis.id], {relativeTo: this.route});
  }
}
