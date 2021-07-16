import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MissionService} from '../../service/mission.service';
import {EvaluationService} from '../../service/evaluation.service';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs';
import {Mission} from '../../Entities/mission';
import {CalendarOptions, EventSourceInput} from '@fullcalendar/angular';
import frLocale from '@fullcalendar/core/locales/fr';

@Component({
  selector: 'app-all-evaluation',
  templateUrl: './all-evaluation.component.html',
  styleUrls: ['./all-evaluation.component.css']
})
export class AllEvaluationComponent implements OnInit {
  missionId: bigint;
  mission$: Observable<Mission> | null = null;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale:  frLocale,
    dateClick: this.handleDateClick.bind(this), // bind is important!
    eventClick: this.handleEventClick.bind(this),
    eventColor: '#0e0c28',
    eventTextColor: '#ffffff',
    eventBackgroundColor: '#0e0c28',
    headerToolbar: {
      right: 'today,dayGridMonth,timeGridWeek',
      center: 'title',
      left: 'prev,next'
    },
    footerToolbar: {
      left: '',
      center: 'prev,next',
      right: ''
    },
  };

  constructor(private route: ActivatedRoute, private msService: MissionService,
              private evService: EvaluationService, private router: Router,
              private toastr: ToastrService) {
    this.missionId = route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.mission$ = this.msService.getMission(this.missionId);
    this.evService.GetEvalutionByMissionId(this.missionId).subscribe(res => {
      const data: EventSourceInput  = [];
      let itemProsseced = 0;
      res.forEach(e => {
        // @ts-ignore
        data.push({
          title: e.title,
          start: new Date(e.startDate).toISOString().slice(0,16),
          end: new Date(e.endDate).toISOString().slice(0,16),
          id: e.id?.toString()
        });
        itemProsseced++;
        if (itemProsseced === res.length)
        {
          this.calendarOptions.events = data;
        }
      });
    });
  }


  handleDateClick(arg: any): void {
    if ( new Date(arg.dateStr).getTime() >= new Date(new Date().toDateString()).getTime())
    {
      this.router.navigate([`/mission/Evaluation/New/${this.missionId}/${arg.dateStr}`]);
    }else {
      this.toastr.warning('vous ne pouvez pas ajouter une évaluation inférieure à date d\'aujourd\'hui', 'Opps!');

    }
  }

  handleEventClick(info: any): void
  {
    this.router.navigate([`/mission/Evaluation/show/${info.event.id}`]);
  }

}
