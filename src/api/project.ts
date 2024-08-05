import { get } from '@/utils/request';

export const getProjectList = async () => {
  return get({}, '/projects');
};
