import { ResponseFailDTO, ResponseSuccessDTO } from "@playnest/core";

class ResponseMapper {
  toSuccess<T extends object = Record<string, unknown>>(
    response?: T
  ): ResponseSuccessDTO<T> {
    if (response)
      return {
        success: true,
        data: response
      };
    else
      return {
        success: true
      };
  }

  toFail(response: string): ResponseFailDTO {
    return {
      success: false,
      message: response
    };
  }
}

export default ResponseMapper;
