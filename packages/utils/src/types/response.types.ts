export interface ResponseFail {
  success: false;
  message: string;
}

export interface ResponseSuccess<T extends object> {
  success: true;
  data: T;
}

export type ResponseType<T extends object = Record<string, unknown>> =
  | ResponseFail
  | ResponseSuccess<T>;
