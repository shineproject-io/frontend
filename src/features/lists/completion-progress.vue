<template>
  <div class="list-progress progress">
    <div
      class="progress-bar progress-bar-striped complete-popover"
      role="progressbar"
      style="width: 100%"
      aria-valuenow="25"
      aria-valuemin="0"
      aria-valuemax="100"
      v-bind:style="'width: ' + completionProgress + '%;'"
      data-toggle="popover"
      data-placement="bottom"
    ></div>
    <div style="display: none">
      <div id="complete-popover-content">
        <button class="btn btn-primary mr-2" v-on:click.prevent="$emit('complete-list')">
          <i class="fas fa-check fa-fw mr-2"/>
          <span>Complete</span>
        </button>
        <button class="btn btn-secondary" onclick="window.$('.complete-popover').popover('hide')">
          <i class="fas fa-times fa-fw mr-2"/>
          <span>Cancel</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isListActive: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    completionProgress() {
      var completedCount = this.$store.getters.getCompletedItems.length;
      var openCount = this.$store.getters.getTodoItems.length;

      var totalCount = completedCount + openCount;
      if (totalCount === 0) return 0;

      var progressValue = (completedCount / totalCount) * 100;
      return progressValue;
    }
  },
  watch: {
    completionProgress() {
      window.$(".complete-popover").popover("hide");

      if (this.completionProgress === 100 && this.isListActive) {
        window.$(".complete-popover").popover({
          html: true,
          content: window.$("#complete-popover-content")
        });
        setTimeout(function() {
          window.$(".complete-popover").popover("show");
        }, 1000);
      }
    }
  }
};
</script>