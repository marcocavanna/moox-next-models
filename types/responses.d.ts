import {
  UserEntity,
  RegistryEntity,
  RegistryTypeEntity
} from './entity';


export namespace APIResponse {

  /* --------
   * Auth Specific Responses
   * -------- */
  export namespace Auth {

    // ----
    // API Response Object
    // ----
    export interface Login<UserDataType = User> {
      userData: UserDataType,

      refreshToken: RefreshToken,

      accessToken: AccessGrant
    }

    export interface AccessGrant {
      token: AccessToken;

      email: string;

      expiresAt: number;

      roles: string[];
    }


    /** Tokens used to make API Call */
    export type RefreshToken = string;

    export type AccessToken = string;


    /** User Data */
    export type User = UserEntity.JSON<'teams.role' | 'teams.team'>;
  }


  /* --------
   * Registries Responses
   * -------- */
  export namespace Registries {

    export type Single<PopulatedPath extends RegistryEntity.PopulableFields = never> =
      RegistryEntity.JSON<PopulatedPath>;

    export type List<PopulatedPath extends RegistryEntity.PopulableFields = never> = Single<PopulatedPath>[];

  }


  /* --------
   * Registry Types Responses
   * -------- */
  export namespace RegistryTypes {

    export type Single<PopulatedPath extends RegistryTypeEntity.PopulableFields = never> = RegistryTypeEntity.JSON<PopulatedPath>;

    export type List<PopulatedPath extends RegistryTypeEntity.PopulableFields = never> = Single<PopulatedPath>[];

  }

}
