/// <reference types="../index" />

import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'

declare module MeteorMongo {
  export class Collection<T={}> extends Mongo.Collection<T> {
    attachSchema<U = {}>(schema: SimpleSchema | U): void
  }
}
