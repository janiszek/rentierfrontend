import { Component, OnInit, Input } from '@angular/core';
import { MessagesService } from '../Services/Messages/messages.service';
import { Message } from '../Model/message';



@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() type;
  @Input() message;

  messages: Message[];
  
  // wstrykujemy MessagesService
  constructor(private messageService: MessagesService) {
    
  }

  ngOnInit(): void {
    // change to ansynchronous comms
    this.messageService.getMessages().subscribe (messages => {
          this.messages = messages;
    });
  }

  onClear(): void {
    this.messageService.clear();
    // reload only this component
    this.ngOnInit();
  }


}
