import { DtoType } from './_utils';

import { RegistryEntity } from '../entity';


export namespace Registry {

  export interface Create {
    /** Registry Type */
    type: DtoType.Nullable<string>,

    typology: RegistryEntity.Typology;

    /** Registry Detail for Individual */
    firstName: DtoType.Nullable<string>,

    lastName: DtoType.Nullable<string>,

    /** Registry Detail for Company */
    companyName: DtoType.Nullable<string>,

    companyPayoff: DtoType.Nullable<string>,

    /** Financial Detail */
    parent: DtoType.Nullable<string>,

    fiscalCode: DtoType.Nullable<string>,

    vatNumber: DtoType.Nullable<string>,

    /** Email Value */
    emails: DtoType.Nullable<DtoType.Array<{ isFavorite: boolean, value: DtoType.Nullable<string> }>>,

    /** Phone Value */
    phones: DtoType.Nullable<DtoType.Array<{ isFavorite: boolean, value: DtoType.Nullable<string> }>>,
  }
}
