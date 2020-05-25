import toast from './toast';

export const handleError = (error: any) => {
  let errorMessage = 'Unknown error occured!';
  if (!error.response) errorMessage = 'Network Error, Are you online?';
  else if (!error.response.data || !error.response.data.message)
    errorMessage = 'Server error occured!';
  else errorMessage = error.response.data.message;
  toast.error(errorMessage);
};
