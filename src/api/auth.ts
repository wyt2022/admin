import { get } from '@/utils/request';

// 角色列表接口
export const getAuthList = async () => {
  return get({}, '/getAuthList');
};
