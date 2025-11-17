declare module 'pg' {
  export interface QueryResult {
    rows: any[]
    rowCount: number
  }
  export class Client {
    constructor(opts?: any)
    connect(): Promise<void>
    query(text: string, params?: any[]): Promise<QueryResult>
    end(): Promise<void>
  }
  export { Client }
}
