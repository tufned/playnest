import { IUserSignup } from '@playnest/utils';
import api from '~/lib/axiosFacade';
import URLs from '~/constants/requests';

const authService = {
  signup: async (formData: IUserSignup) => {
    try {
      const response = await api.post(URLs.auth.signup, formData);
      // if (!response.success)
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  }
};

export default authService;
