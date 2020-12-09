import { UserEntity, RegistryEntity } from './entity';


export namespace APIResponse {

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

  export namespace Registries {

    export type Single = RegistryEntity.JSON;

    export type List = Single[];

  }

}
