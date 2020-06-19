<template>
    <f7-page color-theme="orange" @page:beforein='onPageBeforeIn'>
        <f7-navbar>
			<f7-nav-left>
				<f7-link :href="`/`" icon="icon-back"></f7-link>
			</f7-nav-left>
			<f7-nav-title>{{"웹툰 전체 목록"}}</f7-nav-title>
            <f7-nav-right>
                <f7-link
                    icon-if-ios="f7:menu"
                    icon-if-md="material:menu"
                    panel-open="right"
                ></f7-link>
            </f7-nav-right>
		</f7-navbar>
        <f7-list media-list>
            <f7-list-item>
                <f7-input @input="search = $event.target.value" type="text" placeholder="제목 검색"></f7-input>
            </f7-list-item>
            <f7-list-item v-for='toon in filteredToons' :key='toon.id' :title="toon.title" :link="'/toon/'+toon.id">
                <img
                    slot="media"
                    :src="toon.thumb"
                    width="44"
                />
            </f7-list-item>
        </f7-list>
    </f7-page>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
    data(){
        return {
            search: '',
        }
    },
    mounted(){
    },
    computed: {
        ...mapGetters({
            toons: 'getToons'
        }),
        filteredToons(){
            if(this.search){
                this.search = this.search.trim();
                return this.toons.filter((item)=>{
                    return item.title.indexOf(this.search)?false:true
                })
            }
            return this.toons;
        }
    },
    methods: {
        ...mapActions({
            setToons: 'setToons'
        }),
        onPageBeforeIn(){
            this.$f7.preloader.show();
            this.$axios.get('/api/list')
            .then((result)=>{
                this.$f7.preloader.hide();
                this.setToons(result.data);
            })
        }
    }
};
</script>
