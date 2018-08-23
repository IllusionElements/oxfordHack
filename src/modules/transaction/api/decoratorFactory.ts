type Decorator<T> = (target: any, key: string | symbol, descriptor: PropertyDescriptor) => TypedPropertyDescriptor<T>

export const createDecorator = function decoratorFactory<T>(callback: Decorator<T>): Decorator<T> {
  return callback
}