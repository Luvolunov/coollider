/* eslint-disable import/prefer-default-export */
import { URL } from 'url';

export function buildUrl(path: string): string {
  const url = new URL(path, process.env.API_HOST!);
  return url.href;
}
