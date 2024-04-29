import { Message } from 'primeng/api';

export class MessagesService {

    msgs: Message[] = [];

   showSuccess(msg) {
        this.msgs = [];
        this.msgs.push({severity:'success', summary:'', detail: msg});
        return this.msgs;
    }
    showInfo(msg) {
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'', detail: msg});
        return this.msgs;
    }

    showWarn(msg) {
        this.msgs = [];
        this.msgs.push({severity:'warn', summary:'', detail: msg});
        return this.msgs;
    }

    showError(msg) {
        this.msgs = [];
        this.msgs.push({severity:'error', summary:'', detail: msg});
        return this.msgs;
    }

    clear() {
        return this.msgs = [];
    }
}