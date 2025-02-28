import httpClient from '@/utils/httpClient';

export const verifyCode = (verificationCode: string) => {
  return httpClient.post('/verify', {
    code: verificationCode,
  });
};
