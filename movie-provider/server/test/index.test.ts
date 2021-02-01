import {expect} from 'chai';
import app from '../src/index';
import {agent as request} from 'supertest';
import {cinemaWorld, filmWorld, cinemaMovie, filmMovie} from './mockData';
import {joinMovies, sortMovie} from '../src/services/movies';

describe("Index Test", () => {
    it('should always pass', () => {
        expect(true).to.equal(true);
    });
});

describe("API test", () => {
  it('should GET all movies', async() => {
    const res = await request(app).get('/');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  }).timeout(15000);

  it('should GET single movie', async() => {
    const cid = 'cw2488496';
    const fid = 'fw2488496';

    const res = await request(app).get(`/movie?cid=${cid}&fid=${fid}`);
    expect(res.status).to.equal(200);
    // tslint:disable-next-line: no-unused-expression
    expect(res.body).not.to.be.empty;
  }).timeout(15000);
});

describe("Helper functions test", () => {
  it('should add filmworld id to each object', async() => {
    const res = joinMovies(cinemaWorld.Movies, filmWorld.Movies);
    // tslint:disable-next-line: no-unused-expression
    expect(res[0].FilmId).to.exist;
  });

  it('should add filmworld price to movie object', async() => {
    const res = sortMovie(cinemaMovie, filmMovie);
    // tslint:disable-next-line: no-unused-expression
    expect(res.FilmPrice).to.equal(filmMovie.Price);
  })
})
