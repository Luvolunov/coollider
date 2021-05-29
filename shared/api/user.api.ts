import useSWR from 'swr';
import { ApiResponse } from '../types/api-response.interface';
import { User } from '../types/user.interface';

const getFetcher = (url: string) => fetch(url, {
  headers: {
    'Access-Control-Allow-Credentials': 'true',
  },
  credentials: 'include',
}).then((res) => res.json())
  .then((res: ApiResponse<any>) => res.body);

const UserAPI = {
  current: () => useSWR<User>('/api/user/profile', getFetcher),
  getUser: (id: number) => useSWR<User>(`/api/user/${id}`, getFetcher),
  count: () => useSWR<{count: number}>('/api/user/count', getFetcher),
};

export default UserAPI;
