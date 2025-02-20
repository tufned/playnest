export interface ResponseFailDTO {
  success: false;
  message: string;
}

export interface ResponseSuccessDTO<T> {
  success: true;
  data?: T;
}

export type ResponseDTO<T extends object = Record<string, unknown>> =
  | ResponseFailDTO
  | ResponseSuccessDTO<T>;
