import axios from 'axios';

import { token } from '../../../config';

export const searchPlace = (query: string): Promise<Array<object>> => axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${token}&query=${query}`).then(response => response.data);