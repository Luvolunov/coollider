import useSWR from 'swr';

const getFetcher = (url: string) => fetch(url, {
  headers: {
    'Access-Control-Allow-Credentials': 'true',
  },
  credentials: 'include',
}).then((res) => res.json());

const CourseAPI = {
  list: () => useSWR('/api/course/list', getFetcher),
};

export default CourseAPI;
