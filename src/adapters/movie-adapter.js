export const movieAdapter = (movie) => ({
  id: movie.id,
  title: movie.name,
  posterBig: movie.poster_image,
  poster: movie.preview_image,
  background: movie.background_image,
  backgroundColor: movie.background_color,
  src: movie.video_link,
  preview: movie.preview_video_link,
  description: movie.description,
  ratingScore: movie.rating,
  ratingCount: movie.scores_count,
  director: movie.director,
  starring: movie.starring,
  runTime: movie.run_time,
  genre: movie.genre,
  year: movie.released,
  isFavorite: movie.is_favorite
});

export const moviesAdapter = (movies) => movies.map((movie) => movieAdapter(movie));
