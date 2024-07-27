import { post } from '@/utils/request';
// 导入类型
import { LoginRequest, LoginResponse } from '@/api/user/type';

// 导入接口
// 需要更改时也只需在此处更改
export const userLogin = async (data?: LoginRequest) => {
  return post<LoginResponse>({}, '/login', data);
};
