<template>
  <div class="ccl-left-panel-nav-list clearfix">
    <div class="ccl-left-panel-nav-listitem">
      <a
        id="contactlist"
        href="javascript:void(0);"
        v-on:click="tabClickHandler($event)"
        class="ccl-left-panel-nav-link people active"
      ></a>
    </div>
    <!-- <div class="ccl-left-panel-nav-listitem">
      <a
        id="calllist"
        href="javascript:void(0);"
        v-on:click="tabClickHandler($event)"
        class="ccl-left-panel-nav-link call"
      ></a>
    </div> -->
    <div class="ccl-left-panel-nav-listitem">
      <a
        id="chatlist"
        href="javascript:void(0);"
        v-on:click="tabClickHandler($event)"
        class="ccl-left-panel-nav-link chat"
      ></a>
    </div>
    <div class="ccl-left-panel-nav-listitem">
      <a
        id="grouplist"
        href="javascript:void(0);"
        v-on:click="tabClickHandler($event)"
        class="ccl-left-panel-nav-link grp-chat"
      ></a>
    </div>
    <div class="ccl-left-panel-nav-listitem">
      <a
        id="morelist"
        href="javascript:void(0);"
        v-on:click="tabClickHandler($event)"
        class="ccl-left-panel-nav-link more"
      ></a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Nav",
  methods: {
    tabClickHandler(e) {
      e.preventDefault();

      let currEle = e.currentTarget;
      let currentTabName = currEle.getAttribute("id");
      let oldActive = document.querySelector(".active");
      oldActive.classList.remove("active");


      if (currentTabName == "contactlist") {
        currEle.classList.add("active");
        // this.activeTab = "contacts";
        this.$emit('activeTab', 'contacts');
      } else if (currentTabName === "calllist") {        
        currEle.classList.add("active");
        // this.activeTab = "call";
        this.$emit('activeTab', 'call');
      } else if (currentTabName === "chatlist") {
        currEle.classList.add("active");
        // this.activeTab = "chat";
        this.$emit('activeTab', 'chat');
      } else if (currentTabName === "grouplist") {
        currEle.classList.add("active");
        // this.activeTab = "groups";        
        this.$emit('activeTab', 'groups');
      } else {
        currEle.classList.add("active");
        // this.activeTab = "more";        
        this.$emit('activeTab', 'more');
      }
    }
  }
};
</script>