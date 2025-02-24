import { errors } from "~/constants/errors";
import { ResponseDTO, ResponseFailDTO, ResponseSuccessDTO } from "@playnest/core";
import ResponseMapper from "~/mappers/response.mapper";
import { store } from "~/redux/store";
import { setTimedAppError } from "~/redux/slices/error";
import ErrorMapper from "~/mappers/error.mapper";

export function requestDecorator<T extends object, P = void>(
  serviceMethod: (props: P) => Promise<ResponseDTO<T>>
): (props: P) => Promise<ResponseSuccessDTO<T> | ResponseFailDTO> {
  return async (props) => {
    try {
      const response = await serviceMethod(props);
      if (!response.success) throw new Error(response.message);

      return ResponseMapper.toSuccessDTO(response?.data);
    } catch (err) {
      const error = (err instanceof Error && err.message) || errors.badRequest;
      console.error(error);

      store.dispatch(setTimedAppError(ErrorMapper.toAppErrorDTO(error)));

      return ResponseMapper.toFailDTO(error);
    }
  };
}
