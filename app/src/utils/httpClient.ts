import config from '@/config/config';
import axios from 'axios';

const httpClient = axios.create({
  baseURL: config.APIBaseURL,
});

export default httpClient;
