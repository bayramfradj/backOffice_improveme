import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MissionService} from '../../service/mission.service';
import {EvaluationService} from '../../service/evaluation.service';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs';
import {Mission} from '../../Entities/mission';
import {CalendarOptions} from '@fullcalendar/angular';
import frLocale from '@fullcalendar/core/locales/fr';

@Component({
  selector: 'app-all-evaluation',
  templateUrl: './all-evaluation.component.html',
  styleUrls: ['./all-evaluation.component.css']
})
export class AllEvaluationComponent implements OnInit {
  missionId: bigint;
  mission$: Observable<Mission> | null = null;
  constructor(private route: ActivatedRoute, private msService: MissionService,
              private evService: EvaluationService,  private toastr: ToastrService) {
    this.missionId = route.snapshot.params.id;
  }
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale:  frLocale,
    dateClick: this.handleDateClick.bind(this), // bind is important!
    eventClick: this.handleEventClick.bind(this),
    events: [
      { title: 'event 1 event 1 event 1 event 1 event 1 event 1 event 1 event 1',
        start: '2021-07-05',
        end: '2021-07-05',
        id: '1',
      }
    ],
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


  ngOnInit(): void {
    this.mission$ = this.msService.getMission(this.missionId);
  }


  handleDateClick(arg: any): void {
    alert('date click! ' + arg.dateStr);
  }

  handleEventClick(info: any): void
  {
    alert('Event: ' + info.event.title);
    alert('Coordinates: ' + info.event.id);
    alert('View: ' + info.view.type);

    // change the border color just for fun
    info.el.style.borderColor = 'red';
  }

}
