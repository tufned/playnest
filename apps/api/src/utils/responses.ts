export const success = <T extends object>(response?: T) => {
  if (response)
    return {
      success: true,
      data: response
    };
  else
    return {
      success: true
    };
};

export const fail = (response: string) => {
  return {
    success: false,
    massage: response
  };
};
