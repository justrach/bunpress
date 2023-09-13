import { URL } from 'url';

function getUrl(url:string): string {
  const parsedUrl = new URL(url);
  const endpoint = parsedUrl.pathname;

  console.log(endpoint); // Output: "/test"

  return endpoint;
}

getUrl("http://localhost:3000/test")

export default getUrl;