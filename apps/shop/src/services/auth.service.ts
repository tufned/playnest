import { UserLoginDTO } from "@playnest/core/types/domains/user.types";
import ApiClient from "~/lib/api-client";
import URLs from "~/constants/requests";
import { IAccessTokenResponse, UserSignupForm } from "~/types";
import UserMapper from "~/mappers/user.mapper";
import { requestDecorator } from "~/utils/request-decorator";
import { store } from "~/redux/store";

export class AuthService {
  constructor(
    private readonly userMapper = new UserMapper(),
    private readonly apiClient = new ApiClient(),
    private readonly urls = URLs.auth
  ) {
    this.userMapper = userMapper;
    this.apiClient = apiClient;
    this.urls = urls;
  }

  signup = requestDecorator(async (props: { data: UserSignupForm }) => {
    const userSignupDTO = this.userMapper.toSignupDTO(props.data);
    return await this.apiClient.post<IAccessTokenResponse>(
      this.urls.signup,
      userSignupDTO
    );
  });

  login = requestDecorator(async (props: { data: UserLoginDTO }) => {
    const userLoginDTO = this.userMapper.toLoginDTO(props.data);
    return await this.apiClient.post<IAccessTokenResponse>(this.urls.login, userLoginDTO);
  });

  refreshAccessToken = requestDecorator(async () => {
    let response = await this.apiClient.get<IAccessTokenResponse>(this.urls.refresh);
    const isAuthorized = store.getState().common.isAuthorized;

    if (!isAuthorized && !response.success)
      response = {
        success: true,
        data: {
          accessToken: null
        }
      };
    return response;
  });

  logout = requestDecorator(async () => {
    return await this.apiClient.get<IAccessTokenResponse>(this.urls.logout);
  });
}

export default new AuthService();
