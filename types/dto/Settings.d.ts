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


  export interface Role {
    name: string;

    rank: number;

    isOwner: boolean;

    workingHours: {
      monday: number;
      thursday: number;
      wednesday: number;
      tuesday: number;
      friday: number;
      saturday: number;
      sunday: number;
    }
  }

}
