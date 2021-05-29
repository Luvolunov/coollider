import useSWR from 'swr';
import { ApiResponse } from '../types/api-response.interface';
import { CourseInterface } from '../types/course.interface';

const getFetcher = (url: string) => fetch(url, {
  headers: {
    'Access-Control-Allow-Credentials': 'true',
  },
  credentials: 'include',
}).then((res) => res.json())
  .then((res: ApiResponse<any>) => res.body);

const CourseAPI = {
  list: () => useSWR<Array<CourseInterface>>('/api/course/list', getFetcher),
  count: () => useSWR<{count: number}>('/api/course/count', getFetcher),
};

export default CourseAPI;
