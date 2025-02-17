import {
  ResponseFailDTO,
  ResponseSuccessDTO
} from "@playnest/shared/types/response.types";

export const success = <T extends object = Record<string, unknown>>(
  response?: T
): ResponseSuccessDTO<T> => {
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

export const fail = (response: string): ResponseFailDTO => {
  return {
    success: false,
    message: response
  };
};
