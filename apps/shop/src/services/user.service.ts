import { requestDecorator } from "~/utils/request-decorator";
import UserMapper from "~/mappers/user.mapper";
import ApiClient from "~/lib/api-client";
import URLs from "~/constants/requests";
import { UserDTO } from "@playnest/core";
import { UserUpdateForm, UserUpdatePasswordForm } from "~/types";

class UserService {
  constructor(
    private readonly apiClient = new ApiClient(),
    private readonly userMapper = new UserMapper(),
    private readonly urls = URLs.users
  ) {
    this.apiClient = apiClient;
    this.userMapper = userMapper;
    this.urls = urls;
  }

  get = requestDecorator(async (props: { id: number }) => {
    const url = this.urls.get(props.id);
    return this.apiClient.get<UserDTO>(url);
  });

  update = requestDecorator(async (props: { id: number; user: UserUpdateForm }) => {
    const userUpdateDto = this.userMapper.toUpdateDTO(props.user);
    const url = this.urls.update(props.id);
    return this.apiClient.patch<UserDTO>(url, userUpdateDto);
  });

  updatePassword = requestDecorator(
    async (props: { id: number; data: UserUpdatePasswordForm }) => {
      const userUpdatePasswordDto = this.userMapper.toUserUpdatePasswordDTO(props.data);
      const url = this.urls.updatePassword(props.id);
      return this.apiClient.patch(url, userUpdatePasswordDto);
    }
  );
}

export default new UserService();
