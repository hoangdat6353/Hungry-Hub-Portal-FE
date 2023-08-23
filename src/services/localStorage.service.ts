import { UserInfo } from '@app/domain/UserModel';

export const persistToken = (token: string): void => {
  localStorage.setItem('accessToken', token);
};

export const readToken = (): string | null => {
  const accessToken = localStorage.getItem('accessToken');

  return accessToken;
};

export const persistUserInfo = (userInfo: UserInfo) => {
  const temp = JSON.stringify(userInfo);
  localStorage.setItem('profile', temp);
};

export const readUserInfo = (): UserInfo | null => {
  try {
    const temp = localStorage.getItem('profile');

    if (temp) {
      const userInfo: UserInfo = JSON.parse(temp);

      return userInfo;
    }

    return null;
  } catch {
    return null;
  }
};

export const deleteToken = (): void => localStorage.removeItem('accessToken');

export const clearLocalStore = (): void => localStorage.clear();
