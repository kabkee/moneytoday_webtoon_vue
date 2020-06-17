<template>
    <f7-page color-theme="pink" :page-content="false">
        <f7-navbar>
            <f7-nav-left>
                <f7-link
                    icon-if-ios="f7:menu"
                    icon-if-md="material:menu"
                    panel-open="left"
                ></f7-link>
            </f7-nav-left>
            <f7-nav-title>웹툰창고</f7-nav-title>
            <!-- <f7-nav-right>
        <f7-link icon-if-ios="f7:menu" icon-if-md="material:menu" panel-open="right"></f7-link>
      </f7-nav-right> -->
        </f7-navbar>
        <f7-block strong>
        </f7-block>
		<f7-block-title>최근 본 만화</f7-block-title>
		<f7-list media-list v-if='currentChapters.length'>
            <f7-list-item v-for='chapter in currentChapters' :key='chapter.title+"_"+chapter.id' :title="chapter.folder_name" :link="`/toon/${chapter.toon_id}/chapter/${chapter.id}/`">
                <img
                    slot="media"
                    :src="chapter.thumb"
                    width="44"
                />
			</f7-list-item>
		</f7-list>
		<f7-list media-list v-else>
            <f7-list-item style='color: grey; font-size: 0.8em;' title='최근에 본 만화가 없습니다.'></f7-list-item>
		</f7-list>
        
		<!-- <f7-block-title>Modals</f7-block-title>
        <f7-block strong>
            <f7-row>
                <f7-col width="50">
                    <f7-button fill raised popup-open="#popup">Popup</f7-button>
                </f7-col>
                <f7-col width="50">
                    <f7-button fill raised login-screen-open="#login-screen"
                        >Login Screen</f7-button
                    >
                </f7-col>
            </f7-row>
        </f7-block>
        <f7-block-title>Panels</f7-block-title>
        <f7-block strong>
            <f7-row>
                <f7-col width="50">
                    <f7-button fill raised panel-open="left"
                        >Left Panel</f7-button
                    >
                </f7-col>
                <f7-col width="50">
                    <f7-button fill raised panel-open="right"
                        >Right Panel</f7-button
                    >
                </f7-col>
            </f7-row>
        </f7-block>
        <f7-list>
            <f7-list-item
                link="/dynamic-route/blog/45/post/125/?foo=bar#about"
                title="Dynamic Route"
            ></f7-list-item>
            <f7-list-item
                link="/load-something-that-doesnt-exist/"
                title="Default Route (404)"
            ></f7-list-item>
        </f7-list> -->
    </f7-page>
</template>
<script>
export default {
	data(){
		return {
			currentChapters: [],
		}
	},
	mounted(){
		if(this.$localStorage.available('localStorage')){
			this.currentChapters = this.$localStorage.getCurrentChapter();
		}
	},
	computed: {
		
	},
	methods: {

	},
};
</script>
