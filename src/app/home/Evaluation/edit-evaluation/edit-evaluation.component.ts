import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EvaluationService} from '../../service/evaluation.service';
import {ToastrService} from 'ngx-toastr';
import {Evaluation} from '../../Entities/evaluation';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { TypeEval } from '../../Entities/Type-eval.enum';
import { TypeRes } from '../../Entities/type-res.enum';

@Component({
  selector: 'app-edit-evaluation',
  templateUrl: './edit-evaluation.component.html',
  styleUrls: ['./edit-evaluation.component.css']
})
export class EditEvaluationComponent implements OnInit {
  evalId: bigint;

  // @ts-ignore
  evaluation: Evaluation;
  loader = true;
  public Editor = ClassicEditor;
  readonly TypeEval = Object.keys(TypeEval);
  readonly TypeRes = Object.keys(TypeRes);

  constructor(private route: ActivatedRoute, private evService: EvaluationService,
              private router: Router,  private toastr: ToastrService) {
    this.evalId = route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.evService.GetEvalutionById(this.evalId).subscribe(data => {
      this.evaluation = data;
      // @ts-ignore
      this.evaluation.startDate = new Date(this.evaluation.startDate).toISOString().slice(0,16);
      // @ts-ignore
      this.evaluation.endDate = new Date(this.evaluation.endDate).toISOString().slice(0,16);

      this.loader = false;
    });
  }

  submite(): void {
      this.loader = true;
      this.evService.UpEvalution(this.evaluation).subscribe(data => {
        this.loader = true;
        this.toastr.success('Evaluation ajoutée avec succès' , 'SUCCÈS' );
        this.router.navigate([`/mission/Evaluation/show/${this.evaluation.id}`]);
      }, error => {
        this.loader = false;
        this.toastr.error('Réessayer Ultérieurement', 'ERREUR');

      });
  }
}
