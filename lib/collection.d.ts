declare module 'meteor/mongo' {
  import { Mongo } from 'meteor/mongo'
  import SimpleSchema from 'simpl-schema'

  interface Collection {
    attachSchema<T>(schema: SimpleSchema | T): void
  }

}