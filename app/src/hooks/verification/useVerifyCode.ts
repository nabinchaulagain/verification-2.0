import { verifyCode } from '@/services/verification';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

export const useVerifyCode = () => {
  const navigate = useNavigate();
  return useMutation<unknown, Error, string>({
    mutationFn: verifyCode,
    onSuccess: () => {
      navigate('/success');
      toast('Verification successful');
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        return;
      }

      toast.error('Something went wrong');

      throw error;
    },
  });
};
