import { IMovie } from '../models/movie';
import { IMovieDetail } from '../models/movieDetail';
import * as dotenv from 'dotenv';

// tslint:disable-next-line: no-var-requires
const axios = require('axios').default;
dotenv.config();

axios.interceptors.response.use(undefined, async function axiosRetryInterceptor(err: { config: any; }) {
  // tslint:disable-next-line: no-console
  console.log( 'Intercepting and retrying', err.config);
  const config = err.config;
  // If config does not exist or the retry option is not set, reject
  if(!config || !config.retry) return Promise.reject(err);

  // Set the variable for keeping track of the retry count
  config.__retryCount = config.__retryCount || 0;

  // Check if we've maxed out the total number of retries
  if(config.__retryCount >= config.retry) {
      // Reject with the error
      return Promise.reject(err);
  }

  // Increase the retry count
  config.__retryCount += 1;

  // Create new promise to handle exponential backoff
  const backoff = new Promise<void>( (resolve) => {
      setTimeout( () => {
          resolve();
      }, config.retryDelay || 1);
  });

  // Return the promise in which recalls axios to retry the request
  await backoff;
  return axios(config);
});

export const getMovies = async (provider: string) => {
  try {
    const resp = await axios.get(`${process.env.API_URL}${provider}/movies`, {
      headers: {
        'x-api-key': process.env.API_KEY
      },
      retry: 5,
      retryDelay: 2000
    });
    // tslint:disable-next-line: no-console
    console.log( 'SUCCESS!!');
    return resp.data
  } catch (err) {
    // tslint:disable-next-line: no-console
    console.log( 'Provider Error:', err);
    return err
  }
}

export const getMovie = async(provider: string, id: string) => {
  try {
    const res = await axios.get(`${process.env.API_URL}${provider}/movie/${id}`, {
      headers: {
        'x-api-key': process.env.API_KEY
      },
      retry: 5,
      retryDelay: 2000
    });
    // tslint:disable-next-line: no-console
    console.log( 'SUCCESS!!');
    return res.data;
  } catch (err) {
      // tslint:disable-next-line: no-console
      console.log( 'Provider Error:', err);
      return err
  }
}

export const joinMovies = (cinemaArr: IMovie[], filmArr: IMovie[]) => {
  cinemaArr.map( item => {
    filmArr.forEach( obj => {
      if(item.Title === obj.Title) {
        item.FilmId = obj.ID
      }
    })
  });

  return cinemaArr;
}

export const sortMovie = (cMovie: IMovieDetail, fMovie: IMovieDetail ): IMovieDetail => {
  cMovie.FilmPrice = fMovie.Price;

  return cMovie;
}