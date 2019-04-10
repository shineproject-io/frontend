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
import { mapState, mapGetters } from "vuex";

export default {
  props: {
    isListActive: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapState("todoModule", ["todoItems"]),
    ...mapGetters("todoModule", ["openTodoItems", "completedTodoItems"]),
    completionProgress() {
      var completedCount = this.completedTodoItems.length;
      var totalCount = this.todoItems.length;
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

<style lang="scss">
.list-progress {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 20px;
  opacity: 0.5;
  background-color: transparent;
  border-radius: 0;
}

.list-progress .progress-bar {
  width: 0;
  transition: width 0.6s ease-in-out;
  background-color: $brand-success-colour;
}
</style>