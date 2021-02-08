<template>
    <div id="app">
        <Loader/>
        <PosterBg :poster="posterBg"/>
        <Header/>
        <MoviesList :list="moviesList" @changePoster="onChangePoster"></MoviesList>
        <MoviesPagination
                :current-page="currentPage"
                :per-page="moviesPerPage"
                :total="moviesLength"
                @pageChanged="onPageChanged"
        />
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import MoviesList from "./components/MoviesList";
    import PosterBg from "./components/PosterBg";
    import MoviesPagination from "./components/MoviesPagination";
    import Loader from "./components/Loader";
    import Header from "./components/Header";

    export default {
        name: 'App',
        components: {
            MoviesList,
            PosterBg,
            MoviesPagination,
            Loader,
            Header
        },
        data: () => ({
            posterBg: '',
        }),
        computed: {
            ...mapGetters('moviesStore', ['moviesList', 'currentPage', 'moviesPerPage', 'moviesLength'])
        },
        methods: {
            ...mapActions('moviesStore', ['changeCurrentPage']),
            onChangePoster(poster) {
                this.posterBg = poster;
            },
            onPageChanged(page) {
                this.$router.push({query: {page}});
                this.changeCurrentPage(page);
            }
        },
        created(){
          if(this.$route.query.page){
              this.changeCurrentPage(Number(this.$route.query.page));
          }
        }
    }
</script>

<style>
    #app {
        font-family: Arial, Avenir, Helvetica, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        position: relative;
    }
</style>
