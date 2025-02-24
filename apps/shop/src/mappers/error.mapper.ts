import { AppErrorDTO, AppErrorState } from "~/types/errors.types";
import { v4 as uuid } from "uuid";

class ErrorMapper {
  static toAppErrorDTO(errorMsg: string): AppErrorDTO {
    return {
      message: errorMsg
    };
  }

  static toAppErrorState({ message }: AppErrorDTO): AppErrorState {
    return {
      id: uuid(),
      message
    };
  }
}

export default ErrorMapper;
