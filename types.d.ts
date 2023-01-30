// currently ignored because I'm too lazy to write all custom types
// define your types here and include this file in tsconfig.json
// ...
// "files": [ "types.d.ts" ]
// This is called "Declaration Merging"

declare namespace Express {
  export interface Request {
    user: {
      email: string;
      id: string;
      username: string;
    };
  }
  export interface Response {
    user: {
      email: string;
      id: string;
      username: string;
    };
  }
}
