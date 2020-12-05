export namespace Dto {
  export namespace User {
    export interface Create {
      email: string;

      firstName: string;

      password: string;

      roleId?: string;

      teamName?: string;

      teamId?: string;

      lastName?: string;
    }

    export interface Login {
      email: string;

      password: string;
    }
  }
}
