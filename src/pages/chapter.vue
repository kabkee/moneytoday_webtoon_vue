<template>
    <f7-page color-theme="orange" @page:beforein="onPageBeforeIn">
        <f7-navbar>
			<f7-nav-left>
				<f7-link :href="`/toon/${this.toonId}`" icon="icon-back"></f7-link>
			</f7-nav-left>
			<f7-nav-title>{{chapterData ? chapterData.folder_name : '에피소드'}}</f7-nav-title>
			<f7-nav-right>
                <f7-link
                    icon-if-ios="f7:menu"
                    icon-if-md="material:menu"
                    panel-open="right"
                ></f7-link>
            </f7-nav-right>
		</f7-navbar>
		
        <!-- <f7-list>
            <f7-list-item>
                <f7-input @input="search = $event.target.value" type="text" placeholder="제목 검색"></f7-input>
            </f7-list-item>
        </f7-list> -->
        <f7-list v-if="chapterData" v-touch:swipe.left="swipeLeftHandler" v-touch:swipe.right='swipeRightHandler'>
            <f7-list-item v-for="file in chapterData.toon_files" :key="file">
                <img
                    style="max-width: 100%;"
                    :src="
                        `/data/toon_${chapterData.toon_id}/episode_${chapterData.id}/${file}`
                    "
                />
            </f7-list-item>
        </f7-list>
    </f7-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
    props: ["chapterId", "toonId"],
    data() {
        return {
            search: "",
        };
    },
    mounted() {
	},
    computed: {
        ...mapGetters({
            chapters: "getChapters",
        }),
        chapterData() {
			let chapterId = parseInt(this.chapterId);
			if(this.chapters.length && chapterId != null){
				let data = this.chapters.filter((chapter)=>{
					return chapter.id === chapterId;
				});
				return data[0]
			}
			return {
				title: ''
			}
        },
    },
    methods: {
        ...mapActions({
            setChapters: "setChapters",
        }),
        onPageBeforeIn() {
			this.$f7.preloader.show();
            this.getChapters();
        },
        getChapters() {
            this.$axios.get(`/api/chapter/${this.toonId}`).then((result) => {
				this.$f7.preloader.hide();
				this.setChapters(result.data);
				
				if(result.data && result.data.length){
					let data = result.data.filter((chapter)=>{
						return chapter.id === parseInt(this.chapterId);
					});
					this.saveCurrentChapter(data[0]);
				}
            });
		},
		saveCurrentChapter(data){
			// localStorage 기능 사용 가능할 때, 해당 챕터 최신으로 저장
			if(this.$localStorage.available('localStorage')){
				this.$localStorage.addCurrentChapter(data)
			}
		},
		// 다음
		swipeLeftHandler(){
			let nextChaterId = parseInt(this.chapterId) + 1;
			if(nextChaterId >= this.chapters.length){
				this.$f7.dialog.alert('첫 에피소드입니다.', '안내');
			}else{
				this.$f7router.navigate(`/toon/${this.toonId}/chapter/${nextChaterId}`);
			}
			// if(this.chapters[])
		},
		// 이전
		swipeRightHandler(){
			let nextChaterId = parseInt(this.chapterId) - 1;
			if(nextChaterId < 0){
				this.$f7.dialog.alert('마지막 에피소드입니다.', '안내');
			}else{
				this.$f7router.navigate(`/toon/${this.toonId}/chapter/${nextChaterId}`);
			}
		},
    },
};
</script>
