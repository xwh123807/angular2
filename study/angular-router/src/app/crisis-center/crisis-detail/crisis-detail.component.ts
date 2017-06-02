import { Crisis, CrisisService } from '../crisis.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html',
  styleUrls: ['./crisis-detail.component.css']
})
export class CrisisDetailComponent implements OnInit {
  crisis: Crisis = { id: 0, name: '' };
  editName: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CrisisService
  ) { }

  ngOnInit() {
    //    this.route.data.subscribe((data: { crisis: Crisis }) => {
    //      this.editName = data.crisis.name;
    //      this.crisis = data.crisis;
    //    });
    this.route.params.switchMap((params: Params) => this.service.getCrisis(+params['id']))
      .subscribe(r => { this.editName = r.name; this.crisis = r; });
  }

  save() {
    this.crisis.name = this.editName;
    this.gotoCrises();
  }

  cancel() {
    this.gotoCrises();
  }

  gotoCrises() {
    const crisisId = this.crisis ? this.crisis.id : null;
    this.router.navigate(['../', { id: crisisId, foo: 'foo' }], { relativeTo: this.route });
  }
}
