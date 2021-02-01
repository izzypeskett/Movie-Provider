import express, { urlencoded } from 'express';
import { Request, Response, json} from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import { getMovies, joinMovies, getMovie, sortMovie } from './services/movies';
import { IMovieDetail } from './models/movieDetail';

const app = express();

app.use(json());
app.use(bodyParser.json());
app.use(urlencoded({extended: true}));
app.use(cors());


app.get('/', async(req: Request, res: Response) => {
  const cinemaData = await getMovies('cinemaworld');
  const filmData = await getMovies('filmworld');
  let result;

  if( filmData && cinemaData ) {
    result = joinMovies(cinemaData.Movies, filmData.Movies)
    return res.status(200).json(result);
  } else {
    return res.status(400).send('Error getting movies')
  }
});

app.get('/movie', async (req: Request, res: Response) => {
  let result: IMovieDetail;
  const filmId = req.query.fid as string;
  const cinemaId = req.query.cid as string;
  const cinemaMovie: IMovieDetail = await getMovie('cinemaworld', cinemaId);
  const filmMovie: IMovieDetail = await getMovie('filmworld', filmId);
  if(cinemaMovie && filmMovie) {
    result = sortMovie(cinemaMovie, filmMovie);
    return res.status(200).json(result);
  } else {
    return res.status(400).send('Error getting movie')
  }
});

app.listen(5000, () => {
  // tslint:disable-next-line: no-console
  console.log('Express server started on port: 5000')
})

export default app;

