import useSWR from 'swr';
import { ApiResponse } from '../types/api-response.interface';
import { Role } from '../types/role.interface';

const getFetcher = (url: string) => fetch(url, {
  headers: {
    'Access-Control-Allow-Credentials': 'true',
  },
  credentials: 'include',
}).then((res) => res.json())
  .then((res: ApiResponse<any>) => res.body);

const RoleAPI = {
  list: () => useSWR<Array<Role>>('/api/role/list', getFetcher)
};

export default RoleAPI;
