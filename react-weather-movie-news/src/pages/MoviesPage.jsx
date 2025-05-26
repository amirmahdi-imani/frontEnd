import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../features/movies/moviesSlice";
import { getGenres } from "../features/movies/genresSlice";
import { getMoviesByGenre } from "../features/movies/movieByGenreSlice";
import { searchMoviesThunk } from "../features/movies/searchMovieSlice";
import Layout from "../components/Layout";

const MoviePage = () => {
  const dispatch = useDispatch();

  const { data: popularMovies = [] } = useSelector((state) => state.movies);
  const { data: genres = [] } = useSelector((state) => state.genres);
  const { data: genreMovies = [] } = useSelector((state) => state.movieGenre);
  const { data: searchedMovies = [] } = useSelector((state) => state.moviesSearch);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenreId, setSelectedGenreId] = useState(null);

  useEffect(() => {
    dispatch(getMovies());
    dispatch(getGenres());
  }, [dispatch]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim() !== "") {
      dispatch(searchMoviesThunk({query}));
      setSelectedGenreId(null);
    }
  };

const handleGenreClick = (genreId) => {
  if (genreId === null) {
    dispatch(getMovies());
    setSelectedGenreId(null);
  } else {
    dispatch(getMoviesByGenre({ genreId, page: 1 })); 
    setSelectedGenreId(genreId);
  }
  setSearchQuery("");
};


  const moviesToShow = searchQuery
    ? searchedMovies
    : selectedGenreId
    ? genreMovies
    : popularMovies;

  return (
    <Layout title="Movies">
      <main className="flex text-white">

     
      <section className="flex flex-col flex-grow max-w-5xl mx-auto p-6 
                
                transition-shadow duration-600 hover:shadow-xl
     ">
         
      <div className="mb-6 max-w-xl w-full mx-auto">
             <input
               type="text"
               value={searchQuery}
               onChange={handleSearch}
               placeholder="جستجوی فیلم..."
               className="
               w-full
                 px-4
                 py-3
                 rounded-lg
                 border
                 border-gray-300
                 bg-white
                 text-gray-900
                 placeholder-gray-400
                 shadow-sm
                 transition
                 duration-300
                 ease-in-out
                 focus:outline-none
                 focus:ring-2
                 focus:ring-indigo-500
                 focus:border-indigo-500
                 hover:border-indigo-400
               "
             />
       </div>


    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
      {moviesToShow.length === 0 && (
        <p className="text-center col-span-full text-gray-400">هیچ فیلمی یافت نشد.</p>
      )}
      {moviesToShow.map((movie) => (
        <div key={movie.id} className="bg-gray-800 rounded overflow-hidden">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-56 object-cover"
          />
          <div className="p-3">
            <h3 className="text-md font-semibold truncate">{movie.title}</h3>
            <p className="text-sm text-gray-400">{movie.release_date}</p>
            <p className="text-sm text-yellow-400">⭐ {movie.vote_average}</p>
          </div>
        </div>
      ))}
    </div>
  </section>

 
  <aside className="w-56 ml-6 bg-gray-800 rounded p-4 sticky top-20 max-h-[calc(100vh-5rem)] overflow-auto text-white">
    <h2 className="font-semibold mb-4 text-center">ژانرها</h2>
    <div className="flex flex-col space-y-2">
      {genres.map((genre) => (
        <button
          key={genre.id}
          onClick={() => handleGenreClick(genre.id)}
          className={`text-left px-3 py-1 rounded ${
            selectedGenreId === genre.id
              ? "bg-indigo-600"
              : "hover:bg-indigo-700"
          }`}
        >
          {genre.name}
        </button>
      ))}
      {selectedGenreId && (
        <button
          onClick={() => handleGenreClick(null)}
          className="mt-3 px-3 py-1 rounded bg-red-600 hover:bg-red-700"
        >
          حذف فیلتر
        </button>
      )}
    </div>
  </aside>

</main>

    </Layout>
  );
};

export default MoviePage;
