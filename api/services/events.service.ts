import { EventEmitter } from "events";
import { transactionService } from "../components/transaction"

const eventEmitter = new EventEmitter();

export const emitEvents = (eventName: string, message: any) => {
    console.log({eventMessage: message});
    
    eventEmitter.emit(eventName, message)
}


eventEmitter.on('record-tranaction', (data) => {
    console.log({eventData: data})
    transactionService.recordTransaction(data)
})