interface Node {
  _id: string | number
}

const resolver = {
  resolvers: {
    Query: {
      findTransactionById: async (
          _: any,
          _args: any,
          { db, Service }: {
            db: Mongo.CollectionStatic | Mongo.Collection<{}>,
            Service: any
          }
        ) => {
        const { TransactionService } = await Service.load('TransactionService')
        return TransactionService.listAllTransactions()
      }
    }
  }
}
