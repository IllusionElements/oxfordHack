import { GraphQLAbstractType } from 'graphql';
import { Mongo } from 'meteor/mongo'
// @ts-ignore
import { db as mongodb } from 'meteor/cultofcoders:grapher'

type TransactionInput = {
  _id: String,
}
const idx = (o: any, f: (s: any) => any) => {
  try {
    return f(o)
  } catch(e) {
    return false
  }
}
const resolver = (f: (...args: any[]) => any, dbName?: string) => (
    _root: object,
    args: object,
    ctx: object & { [key: string]: any },
    ast: GraphQLAbstractType
  ) => {
    if(dbName && idx(ctx, (cxt) => cxt.db[dbName])) {
      const { db = null, ...restCtx } = ctx
      return f({
        ...args,
        ...restCtx,
        [dbName]: db || mongodb[dbName],
        ast,
      })
    }

    return f({
      ...args,
      ...ctx,
      ast
    })
}

const resolve = (dbName?: string) => (target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
    return {
      ...descriptor,
      value: resolver(target[propertyKey].bind(target), dbName)
    }
  }

const inject = <T>(o: T & object) => (target: any) => {
  const [key, value] = (Object.entries(o) as [string, any])
  Object.defineProperty(target, (key as string), {
    value,
  })
}
const resolveTransaction = resolve('transaction')

@inject({

})
export class TransactionServiceModel<T> {
  constructor(public db: Mongo.CollectionStatic | Mongo.Collection<T>) {}

  @resolveTransaction
  createTransaction(input: TransactionInput) {
    return input
  }
}