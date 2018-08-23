declare module 'simpl-schema' {
  export default class SimpleSchema {
    constructor(name: string)
  }
}

declare type Constructor<T={}> = new (...args: any[]) => T