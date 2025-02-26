import { requestDecorator } from "~/utils/request-decorator";
import UserMapper from "~/mappers/user.mapper";
import ApiClient from "~/lib/api-client";
import URLs from "~/constants/requests";
import { UserDTO } from "@playnest/core";

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
}

export default new UserService();
