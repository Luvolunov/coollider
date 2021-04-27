import useSWR from 'swr';
import buildUrl from '../utils/build-url';

const getFetcher = (url: string) => fetch(url, { credentials: 'include' }).then((res) => res.json());

const UserAPI = {
  current: () => useSWR(buildUrl('/user/profile'), getFetcher),
  getUser: (id: number) => useSWR(buildUrl(`/user/${id}`), getFetcher),
};

export default UserAPI;
