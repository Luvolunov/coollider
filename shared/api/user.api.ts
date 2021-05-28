import useSWR from 'swr';

const getFetcher = (url: string) => fetch(url, {
  headers: {
    'Access-Control-Allow-Credentials': 'true',
  },
  credentials: 'include',
}).then((res) => res.json());

const UserAPI = {
  current: () => useSWR('/api/user/profile', getFetcher),
  getUser: (id: number) => useSWR(`/api/user/${id}`, getFetcher),
  count: () => useSWR('/api/user/count', getFetcher),
};

export default UserAPI;
