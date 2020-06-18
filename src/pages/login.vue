<template>
    <f7-page color-theme="orange">
        <f7-navbar>
            <!-- <f7-nav-left>
				<f7-link :href="`/toons`" icon="icon-back"></f7-link>
			</f7-nav-left> -->
            <f7-nav-title>Login</f7-nav-title>
            <!-- <f7-nav-right>
                <f7-link
                    icon-if-ios="f7:menu"
                    icon-if-md="material:menu"
                    panel-open="left"
                ></f7-link>
            </f7-nav-right> -->
        </f7-navbar>
        <f7-list inline-labels no-hairlines-md>
            <f7-list-input
                label="ID"
                type="text"
                placeholder="ID"
                clear-button
				autofocus
                @input="id = $event.target.value"
            ></f7-list-input>
            <f7-list-input
                label="PASSWORD"
                type="password"
                placeholder="PASSWORD"
                clear-button
                @input="pw = $event.target.value"
            ></f7-list-input>
            <f7-button style='margin-top: 1em;' round fill raised big @click="onClickLogin">Login</f7-button>
        </f7-list>
        <f7-list inline-labels no-hairlines-md> </f7-list>
    </f7-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
    props: ["toonId"],
    data() {
        return {
            id: "",
			pw: "",
			confirmData: {
				id: 'admin',
				pw: '1234567890a'
			}
        };
    },
    mounted() {},
    computed: {},
    methods: {
		onClickLogin(){
			if(this.id == this.confirmData.id && this.pw == this.confirmData.pw){
				if(this.$localStorage.available('localStorage')){
					this.$localStorage.setAuthed(1);
					this.$f7router.navigate('/');
				}
			}else{
				this.$f7.dialog.alert('정보가 잘못 되었습니다.', '경고');
				this.pw = '';
			}
		}
	},
};
</script>
