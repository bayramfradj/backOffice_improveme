import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EvaluationService} from '../../service/evaluation.service';
import {Evaluation} from '../../Entities/evaluation';
import {ToastrService} from 'ngx-toastr';
import {Mission} from '../../Entities/mission';
import {MissionService} from '../../service/mission.service';
import {Groupe} from '../../Entities/groupe';
import {Response} from '../../Entities/response';
import {TypeRes} from '../../Entities/type-res.enum';

@Component({
  selector: 'app-show-evaluation',
  templateUrl: './show-evaluation.component.html',
  styleUrls: ['./show-evaluation.component.css']
})
export class ShowEvaluationComponent implements OnInit {
  evalId: bigint;
  evaluation: Evaluation | null = null;
  loader = true;
  mission$: Mission | undefined;
  editable = true;
  groupes: Groupe[] = [];
  selectedRep?: Response;
  selectedGroupe?: Groupe;
  readonly TypeRes = TypeRes;
  loadAvis = false;
  constructor(private route: ActivatedRoute, private evService: EvaluationService,
              private router: Router,  private toastr: ToastrService, private msService: MissionService) {
    this.evalId = route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.evService.GetEvalutionById(this.evalId).subscribe(async data => {
      this.evaluation = data;
      this.evaluation.startDate = new Date(data.startDate).toISOString().slice(0, 16);
      this.evaluation.endDate = new Date(data.endDate).toISOString().slice(0, 16);
      this.verifEditable(this.evaluation.startDate);
      if (data.missionId != null) {
        await this.msService.getMission(data.missionId).subscribe(m => {
          this.mission$ = m;
        });
        await this.evService.AllByMission(data.missionId).subscribe(groupes => {
          this.groupes = groupes;
        });
      }
      this.loader = false;
    });
  }

  verifEditable(Sdate: string): void
  {
    if (new Date(Sdate).getTime() <= new Date(new Date().toISOString()).getTime()) {
      this.editable = false;
    }
  }

  handleClickEdit(): void
  {
    this.router.navigate([`/mission/Evaluation/Edit/${this.evalId}`]);
  }

  handleClickRemove(): void
  {
    this.evService.RemoveEvalution(this.evalId).subscribe(data => {
      if (data)
      {
        this.toastr.success('Evaluation ajoutée avec succès' , 'SUCCÈS' );
        this.router.navigate([`/mission/Evaluation/${this.evaluation?.missionId}`]);
      }
      else {
        this.toastr.error('Réessayer Ultérieurement', 'ERREUR');

      }
    }, error => {
      this.toastr.error('Réessayer Ultérieurement', 'ERREUR');
    });
  }

  checkResponse(groupeId: bigint | undefined): boolean
  {
    let rep = false;
    this.evaluation?.responses?.forEach( r => {
      if ( r.groupeId === groupeId) {
        rep =  true;
      }
    });
    return rep;
  }

  traite(groupeId: bigint| undefined): boolean
  {
    let rep = false;
    this.evaluation?.responses?.forEach( r => {
      if ( r.groupeId === groupeId && r.validated) {
        rep =  true;
      }
    });
    return rep;
  }

  loadRep(groupe: Groupe): void
  {
    this.selectedGroupe = groupe;
    this.selectedRep = this.evaluation?.responses?.find(r => r.groupeId === groupe.id);
  }


  submite(): void {
      if (this.selectedRep) {
        this.loadAvis = true;
        this.selectedRep.validated = true;
        this.evService.UpResponse(this.selectedRep, this.selectedRep.id).subscribe(res => {
          this.selectedRep = res;
          this.toastr.success('Avis envoyé avec succès', 'SUCCÈS');
          this.loadAvis = false;
        }, error => {
          this.loadAvis = false;
          // @ts-ignore
          this.selectedRep?.validated = false;
          this.toastr.error('Réessayer Ultérieurement', 'ERREUR');
        });
      }
  }
}
