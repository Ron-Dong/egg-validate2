import type {Rules} from "async-validator";

interface ValidateRules extends Rules {

}


declare module 'egg' {
  export interface Context {
    validator: () => {
      validate: (rules: ValidateRules, data: any, code?: number) => void;
      filterValidate: (rules: ValidateRules, data: any, code?: number) => void;
    }
  }
}
