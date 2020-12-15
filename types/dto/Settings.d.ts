import { DtoType } from './_utils';


export namespace Settings {

  export interface RegistryType {
    description: DtoType.Nullable<string>;

    isCustomer: boolean;

    isIdle: boolean;

    isProspect: boolean;

    isSupplier: boolean;

    name: string;
  }

}
