import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MissionService} from '../../service/mission.service';
import {Mission} from '../../Entities/mission';
import {EvaluationService} from '../../service/evaluation.service';
import {Groupe} from '../../Entities/groupe';
import {ChatService} from '../../service/chat.service';
import {Room} from '../../Entities/room';
import {AuthService} from '../../../Services/auth.service';
import {Message} from '../../Entities/message';
import {ToastrService} from 'ngx-toastr';
import {StompService} from '../../service/stomp.service';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  private stompClient: any;

  missionId: bigint;
  // @ts-ignore
  mission: Mission;
  messagesBox = [];
  Groupes: Groupe[] = [];
  rooms: any = [];
  // @ts-ignore
  selctedRoom: Room = {messages : []} ;
  name?: string;
  userId?: string;
  message = new Message();

  pageLoading = true;


  constructor(private route: ActivatedRoute, private msService: MissionService,
              private evService: EvaluationService, private chatService: ChatService,
              private auth: AuthService, private toastr: ToastrService,
              private stompService: StompService) {
    this.missionId = route.snapshot.params.id;
    this.auth.getUserProfile().then(value => {
      this.name = value.firstName;
      this.name += ' ' + value.lastName;
    });
    this.userId = this.auth.getLoggedUser()?.sub;
  }

  ngOnInit(): void {
    this.stompClient = this.stompService.getStompClient();
    this.msService.getMission(this.missionId).subscribe(mission => {
      this.mission = mission;
    });
    this.loadMessagesBox();
  }
  loadMessagesBox(): void{
    this.evService.AllByMission(this.missionId).subscribe(groupes => {
      this.Groupes = groupes;
      if ( groupes.length > 0)
      {
        let itemsProcessed = 0;
        groupes.forEach(async groupe => {
            await this.chatService.GetRoomByGroupeId(groupe.id).subscribe(room => {
              console.log(room);
              this.rooms.push(room);
              this.subscribeChannel(itemsProcessed);
              itemsProcessed++;
              if (itemsProcessed === groupes.length)
              {
                this.loadSelectedRoom(this.rooms[0]);
                this.pageLoading = false;
              }
            });
        });
      }
      else {
        this.pageLoading = false;
        this.toastr.info('Aucune groupe de discussion', 'Opps !');

      }
    }, error => {
      this.pageLoading = false;
      this.toastr.error('Réessayer Ultérieurement', 'ERREUR');

    });
  }
  loadSelectedRoom(room: Room): void {
    this.selctedRoom = room;
    setTimeout(() => {
      // @ts-ignore
       document.getElementById(`m${room.messages[room.messages?.length - 1].id}`)
         .scrollIntoView({ block: 'end', inline: 'nearest'});
    }, 10 );
  }

  sendMessage(): void {
    const ms = new Message();
    ms.date = Date.now().toString();
    ms.time = Date.now().toString();
    ms.userId = this.userId;
    ms.userName = this.name;
    ms.content = this.message.content;
    if (this.selctedRoom.id != null) {
      this.message = new Message();
      this.chatService.SendMessage(ms, this.selctedRoom.id).subscribe(value => {
        console.log('message envoyé');
      });
    }
  }

  getGroupeName(groupeId: bigint): string | undefined
  {
    const groupe = this.Groupes.find(g => g.id === groupeId);
    return groupe?.name?.toUpperCase();
  }

  subscribeChannel(index: number): void
  {
      const that = this;
      that.stompClient.subscribe(`/chat-room/${that.rooms[index].id}`,  (ms: any) => {
        console.log('ws response', ms);
        that.loadMessage(JSON.parse(ms.body), index);
      });
  }

  loadMessage(m: Message, index: number): void
  {
    this.rooms[index].messages?.push(m);
    setTimeout(() => {
      // @ts-ignore
      document.getElementById(`m${m.id}`)
        .scrollIntoView({ block: 'end', inline: 'nearest'});
    }, 1 );

  }
}
