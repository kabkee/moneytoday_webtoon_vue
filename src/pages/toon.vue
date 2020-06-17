<template>
    <f7-page color-theme="orange" @page:beforein='onPageBeforeIn'>
         <f7-navbar>
			<f7-nav-left>
				<f7-link :href="`/toons`" icon="icon-back"></f7-link>
			</f7-nav-left>
			<f7-nav-title>{{toonData?toonData.title:''}}</f7-nav-title>
			<f7-nav-right>
                <f7-link
                    icon-if-ios="f7:menu"
                    icon-if-md="material:menu"
                    panel-open="left"
                ></f7-link>
            </f7-nav-right>
		</f7-navbar>
        <!-- <f7-list>
            <f7-list-item>
                <f7-input @input="search = $event.target.value" type="text" placeholder="제목 검색"></f7-input>
            </f7-list-item>
        </f7-list> -->
        <f7-list media-list>
            <f7-list-item v-for='chapter in filteredChapters' :key='chapter.toon_title+chapter.id' :title="chapter.folder_name" :link="`/toon/${toonId}/chapter/${chapter.id}/`">
                <img
                    slot="media"
                    :src="chapter.thumb"
                    width="44"
                />
            </f7-list-item>
        </f7-list>
    </f7-page>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
	props: [
		'toonId',
	],
    data(){
        return {
			search: '',
        }
	},
	mounted(){
	},
    computed: {
		...mapGetters({
            toons: 'getToons',
            chapters: 'getChapters'
		}),
		toonData(){
			let toonId = parseInt(this.toonId);
			if(this.toons.length && toonId != null){
				let data = this.toons.filter((toon)=>{
					return toon.id === toonId;
				});
				return data[0]
			}
			return {
				title: ''
			}
		},
        filteredChapters(){
            if(this.search){
                this.search = this.search.trim();
                return this.chapters.filter((item)=>{
                    return item.title.indexOf(this.search)?false:true
                })
            }
            return this.chapters;
        }
    },
    methods: {
		...mapActions({
			setToons: 'setToons',
			setChapters: 'setChapters'
		}),
        onPageBeforeIn(){
			if(this.toons.length == 0){
				this.$axios.get('/api/list')
				.then((result)=>{
					this.setToons(result.data);
				})
			}
			this.$f7.preloader.show();
			this.getChapters();
		},
		getChapters(){
			this.$axios.get(`/api/chapter/${this.toonId}`)
			.then((result)=>{
				this.$f7.preloader.hide();
				this.setChapters(result.data);
			})
		}
    }
};
</script>
