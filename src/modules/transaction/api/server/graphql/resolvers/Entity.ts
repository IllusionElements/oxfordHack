import { GraphQLAbstractType } from 'graphql'

enum GraphQLAction {
  Query = 'Query',
  Subcription = 'Subscription',
  Mutation = 'Mutation'
}

const filterAndReduce = (arr: any[], keyMatch: GraphQLAction, target: any) => arr.filter(key => key.includes(keyMatch)).reduce((main, key) => ({
  ...main,
  [key.replace(`${keyMatch}::`, '')]: Reflect.getMetadata(key, target),
}), {})
export const Entity = (typedefs: GraphQLAbstractType) => {
  return (target: any) => {
    const Keys = Reflect.getMetadataKeys(target)
    const reducer = (type: GraphQLAction) => filterAndReduce(Keys, type, target)

    import('graphql-load').then(({ load })=>load({
      typedefs,
      Query: reducer(GraphQLAction.Query),
      Mutation: reducer(GraphQLAction.Mutation),
      Subscription: reducer(GraphQLAction.Subcription)
    }))

    return target
  }
}