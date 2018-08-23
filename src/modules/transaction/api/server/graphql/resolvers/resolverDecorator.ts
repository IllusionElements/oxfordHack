import "reflect-metadata"

const decorator =  (type?: string) => (target: any, propertyKey: string): any => (
    Reflect.defineMetadata(
      `${type}::${propertyKey}`,
      target[propertyKey],
      target
    )
)

export const createResolverDecorator = ($type: string) => decorator($type)


