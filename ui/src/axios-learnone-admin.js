import axios from 'axios';
import { selleroneAPIHost } from './shared/consts';

const instance = axios.create({
    baseURL: selleroneAPIHost
});

export default instance;  