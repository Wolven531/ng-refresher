import { Component, OnInit } from '@angular/core'
import { MessageService } from '../message.service'

@Component({
	selector: 'app-messages',
	styleUrls: ['./messages.component.sass'],
	templateUrl: './messages.component.html',
})
export class MessagesComponent implements OnInit {
	constructor(
		public readonly messageService: MessageService,
	) { }

	ngOnInit(): void {
	}
}
