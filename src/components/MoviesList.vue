<template>
    <BContainer>
        <h3 class="list-title">{{listTitle}}</h3>
        <BRow>
            <template v-if="isExist">
                <BCol cols="3" v-for="(movie, key) in list" :key="key">
                    <MovieItem :movie="movie"
                               @mouseover.native="onMouseOver(movie.Poster)"
                               @removeItem="onRemoveItem"
                    ></MovieItem>
                </BCol>
            </template>
            <template v-else>
                <div>Empty list</div>
            </template>
        </BRow>
    </BContainer>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import MovieItem from "./MovieItem";

    export default {
        name: "MoviesList",
        components: {
            MovieItem
        },
        props: {
            list: {
                type: Object,
                default: () => ({}),

            }
        },
        computed: {
            ...mapGetters('moviesStore', ['isSearch']),
            isExist() {
                return Boolean(Object.keys(this.list).length)
            },
            listTitle() {
                return this.isSearch ? 'Search result' : 'IMBD Top 250'
            }
        },
        methods: {
            ...mapActions('moviesStore', ['removeMovie']),
            onMouseOver(poster) {
                this.$emit('changePoster', poster);
            },
            async onRemoveItem({id, title}) {
                const isConfirmed = await this.$bvModal.msgBoxConfirm(`Are you sure delete ${title} ?`);
                if (isConfirmed) {
                    this.removeMovie(id);
                }
            }
        }
    }
</script>

<style scoped>
    .list-title {
        font-size: 40px;
        margin-bottom: 30px;
        color: white;
    }

</style>
