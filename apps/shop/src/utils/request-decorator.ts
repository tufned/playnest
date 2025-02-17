import { errors } from "~/constants/errors";
import {
  ResponseDTO,
  ResponseFailDTO,
  ResponseSuccessDTO
} from "@playnest/shared/types/response.types";
import ResponseMapper from "~/mappers/response.mapper";

export function requestDecorator<T extends object, P = void>(
  serviceMethod: (props: P) => Promise<ResponseDTO<T>>
): (props: P) => Promise<ResponseSuccessDTO<T> | ResponseFailDTO> {
  return async (props) => {
    try {
      const response = await serviceMethod(props);
      if (!response.success) throw new Error(response.message);

      return ResponseMapper.toSuccessDTO(response?.data);
    } catch (err) {
      const error = err instanceof Error ? err.message : errors.badRequest;
      console.error(error);

      // TODO: set error message via redux

      return ResponseMapper.toFailDTO(error);
    }
  };
}
