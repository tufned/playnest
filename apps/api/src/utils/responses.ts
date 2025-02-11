import { ResponseFail, ResponseSuccess } from "@playnest/shared/types/response.types";

export const success = <T extends object = Record<string, unknown>>(
  response?: T
): ResponseSuccess<T> => {
  if (response)
    return {
      success: true,
      data: response
    };
  else
    return {
      success: true
    };
};

export const fail = (response: string): ResponseFail => {
  return {
    success: false,
    message: response
  };
};
