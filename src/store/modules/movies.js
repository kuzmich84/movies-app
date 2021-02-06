import axios from "../../plugins/axios"
import IDs from '../mock/imdb_top250'
import mutations from "../mutations";


function serializeResponse(movies) {
    return movies.reduce((acc, movie) => {
        acc[movie.imdbID] = movie;
        return acc;
    }, {})

}

const {MOVIES} = mutations;

const moviesStore = {
    namespaced: true,
    state: {
        top250Ids: IDs,
        moviesPerPage: 12,
        currentPage: 1,
        movies: {},
    },
    getters: {
        slicedIDs: ({top250Ids}) => (from, to) => top250Ids.slice(from, to),
        currentPage: ({currentPage}) => currentPage,
        moviesPerPage: ({moviesPerPage}) => moviesPerPage
    },
    mutations: {
        [MOVIES](state, value) {
            state.movies = value;
        }
    },
    actions: {
        async fetchMovies({getters, commit}) {
            try {
                const {currentPage, moviesPerPage, slicedIDs} = getters;
                const from = (currentPage * moviesPerPage) - moviesPerPage;
                const to = currentPage * moviesPerPage;
                const moviesToFetch = slicedIDs(from, to);

                const requests = moviesToFetch.map((id) => axios.get(`/?i=${id}`));

                const response = await Promise.all(requests);
                const movies = serializeResponse(response);
                commit(MOVIES, movies);
            } catch (err) {
                console.log(err)
            }

        }
    }
};

export default moviesStore;