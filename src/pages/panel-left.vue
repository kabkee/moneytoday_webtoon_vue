<template>
  <f7-page color-theme='orange'>
    <f7-navbar title="메뉴"></f7-navbar>
    <!-- <f7-block strong>
      <p>Left panel content goes here</p>
    </f7-block> -->
    <!-- <f7-block-title>Load page in panel</f7-block-title>
	-->
    <f7-list>
      <f7-list-item link="/" view="#main-view" title="메인" panel-close></f7-list-item>
      <f7-list-item link="/toons/" view="#main-view" title="전체 목록" panel-close></f7-list-item>
      <!-- <f7-list-item link="/toons/" title="즐겨찾기"></f7-list-item> -->
    </f7-list>
    <f7-block-title>기타</f7-block-title>
    <f7-list>
      <f7-list-item link="/about/" title="웹툰 창고란?" view="#main-view" panel-close></f7-list-item>
      <!-- <f7-list-item link="/form/" title="Form" view="#main-view" panel-close></f7-list-item> -->
    </f7-list>
  </f7-page>
</template>
<script>
export default {}
</script>
