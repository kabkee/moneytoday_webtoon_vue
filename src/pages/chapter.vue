<template>
    <f7-page color-theme="orange" @page:beforein="onPageBeforeIn">
        <f7-navbar
            :title="chapterData ? chapterData.folder_name : '에피소드'"
            back-link="Back"
        ></f7-navbar>
        <!-- <f7-list>
            <f7-list-item>
                <f7-input @input="search = $event.target.value" type="text" placeholder="제목 검색"></f7-input>
            </f7-list-item>
        </f7-list> -->
        <f7-list v-if="chapterData">
            <f7-list-item v-for="file in chapterData.toon_files" :key="file">
                <img
                    style="max-width: 100%;"
                    :src="
                        `/data/${chapterData.toon_title}/${chapterData.folder_name}/${file}`
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
    mounted() {},
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
            console.info(
                "this.toonId, this.chapterId",
                this.toonId,
                this.chapterId
            );
            this.getChapters();
        },
        getChapters() {
            this.$axios.get(`/api/chapter/${this.toonId}`).then((result) => {
				this.setChapters(result.data);
				
				console.info('result.data', result.data)
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
				console.info('this.$localStorage.getCurrentChapter()', this.$localStorage.getCurrentChapter());
			}
		}
    },
};
</script>
