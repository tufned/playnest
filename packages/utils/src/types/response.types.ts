export interface ResponseFail {
  success: false;
  message: string;
}

export interface ResponseSuccess<T = Record<string, unknown>> {
  success: true;
  data?: T;
}

export type IResponse = ResponseFail | ResponseSuccess;
