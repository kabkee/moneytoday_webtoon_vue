<template>
    <f7-page color-theme="orange" @page:beforein='onPageBeforeIn'>
        <f7-navbar title="웹툰 전체 목록" back-link="Back"></f7-navbar>
        <f7-list>
            <f7-list-item>
                <f7-input @input="search = $event.target.value" type="text" placeholder="제목 검색"></f7-input>
            </f7-list-item>
        </f7-list>
        <f7-list media-list>
            <f7-list-item v-for='(toon, toonIdx) in filteredToons' :key='toonIdx' :title="toon.title" link="#">
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
export default {
    data(){
        return {
            toons: [],
            search: '',
        }
    },
    computed: {
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
        onPageBeforeIn(){
            this.$axios.get('/api/list')
            .then((result)=>{
                this.toons = result.data
            })
        }
    }
};
</script>
