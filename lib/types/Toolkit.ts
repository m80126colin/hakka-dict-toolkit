export namespace HakkaDictionaryToolkit {
  export interface Option {
    verbose? : boolean
  }
  export interface Filter {
    (context : string) : string
  }
}