// @ts-ignore
import { Vent } from 'meteor/cultofcoders:redis-oplog'

const namespaceCreate = (ns: string, nsChild: string) => `${ns}::${nsChild}`

interface DispatchEvent<T, ENUM> {
  name: ENUM
  payload: T
}

interface DispatchArguments<Payload, ENUM> {
  namespace?: string,
  event: DispatchEvent<Payload, ENUM>
}

interface SubscribeAction {
  namespace: string,
  eventName: string,
  listener: (...args: any[]) => any
}
export class EventSourcer {
  constructor(public namespace: string) {}

  dispatch<Payload, EventType>({
      namespace = this.namespace,
      event,
    }: DispatchArguments<Payload, EventType>
  ): void
  {
    if(event.name && typeof(event.name) === 'string') {
      Vent.emit(namespaceCreate(namespace, event.name), event)
    }
  }

  subscribe({
    namespace = this.namespace,
    eventName,
    listener,
  }: SubscribeAction) {
    const ns = namespaceCreate(namespace, eventName)
    Vent.subscribe(ns, listener)
    return () => Vent.unsubscribe(ns, listener)
  }
}
