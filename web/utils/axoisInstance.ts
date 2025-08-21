import axios from "axios";



export const api = axios.create({
    baseURL:  `${process.env.NEXT_PUBLIC_API_DEV_URL}/api/v1`,
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });