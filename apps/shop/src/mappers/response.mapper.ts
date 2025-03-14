import { ResponseFailDTO, ResponseSuccessDTO } from "@playnest/core";

class ResponseMapper {
  static toSuccessDTO<T extends object>(data?: T): ResponseSuccessDTO<T> {
    if (!data) return { success: true };
    return {
      success: true,
      data
    };
  }

  static toFailDTO(message: string): ResponseFailDTO {
    return {
      success: false,
      message
    };
  }
}

export default ResponseMapper;
