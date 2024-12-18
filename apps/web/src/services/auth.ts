import { fail, IResponse, IUserLogin, IUserSignup, success } from '@playnest/utils';
import api from '~/lib/axios';
import URLs from '~/constants/requests';
import { errors } from '~/constants/errors';

const authService = {
  signup: async (formData: IUserSignup): Promise<IResponse> => {
    try {
      const response: IResponse = await api.post(URLs.auth.signup, formData);
      if (!response.success) throw new Error(response.message);
      return success(response.data);
    } catch (err) {
      return fail(err instanceof Error ? err.message : errors.badRequest);
    }
  },
  login: async (formData: IUserLogin): Promise<IResponse> => {
    try {
      const response: IResponse = await api.post(URLs.auth.login, formData);
      if (!response.success) throw new Error(response.message);
      return success(response.data);
    } catch (err) {
      return fail(err instanceof Error ? err.message : errors.badRequest);
    }
  }
};

export default authService;
