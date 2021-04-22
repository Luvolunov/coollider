export default function buildUrl(path: string) {
  return `${process.env.API_HOST}${path}`;
}
