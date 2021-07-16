import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {EvaluationService} from '../../service/evaluation.service';
import {Evaluation} from '../../Entities/evaluation';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {TypeEval} from '../../Entities/Type-eval.enum';
import {TypeRes} from '../../Entities/type-res.enum';


@Component({
  selector: 'app-add-evaluation',
  templateUrl: './add-evaluation.component.html',
  styleUrls: ['./add-evaluation.component.css']
})
export class AddEvaluationComponent implements OnInit {
  missionId: bigint;
  sdate: string;
  evaluation = new Evaluation();
  public Editor = ClassicEditor;
  loader = false;
  readonly TypeEval = Object.keys(TypeEval);
  readonly TypeRes = Object.keys(TypeRes);

  constructor(private route: ActivatedRoute, private toastr: ToastrService,
              private evService: EvaluationService, private router: Router) {
    this.missionId = route.snapshot.params.id;
    this.sdate = route.snapshot.params.SDate;

  }

  ngOnInit(): void {
    this.evaluation.startDate = new Date(this.sdate).toISOString().slice(0,16);
    this.evaluation.missionId = this.missionId;
    this.evaluation.decription = '';
  }

  submite(): void {
    this.loader = true;
    this.evService.AddEvalution(this.evaluation).subscribe(res => {
      console.log(res);
      this.loader = false;
      this.evaluation = new Evaluation();
      this.evaluation.startDate = new Date(this.sdate).toISOString().slice(0,16);
      this.evaluation.missionId = this.missionId;
      this.evaluation.decription = '';
      this.toastr.success('Evaluation ajoutée avec succès' , 'SUCCÈS' );
      this.router.navigate([`/mission/Evaluation/${this.missionId}`]);

    }, error => {
      this.loader = false;
      this.toastr.error('Réessayer Ultérieurement', 'ERREUR');
    });
  }

  verifDate(): boolean
  {
    console.log('verif date');
    if (this.evaluation.endDate != null){
      // tslint:disable-next-line:max-line-length
      return new Date(this.evaluation.startDate).getTime() < new Date(new Date(this.evaluation.endDate).toISOString().slice(0,16)).getTime();
    }
    return false;
  }
}
