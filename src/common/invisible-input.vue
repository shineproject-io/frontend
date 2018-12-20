<template>
  <form v-on:submit.prevent="evaluateValue">
    <div
      ref="editableField"
      contenteditable="true"
      v-on:keydown.enter.stop="$refs.editableField.blur()"
      v-on:blur="extractContent"
      class="invisible-input"
      :placeholder="placeholder"
      v-html="currentText"
      v-focus="isFocused"
      v-bind:class="classList"
    ></div>
  </form>
</template>

<script>
export default {
  name: "invisible-input",
  directives: {
    focus: {
      inserted: function(el, binding) {
        if (binding.value === true) {
          el.focus();
        }
      }
    }
  },
  props: {
    text: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    clearOnInput: {
      type: Boolean,
      default: false
    },
    classList: {
      type: String,
      default: ""
    },
    isFocused: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      currentText: "",
      storedText: ""
    };
  },
  mounted: function() {
    this.currentText = this.text;
    this.storedText = this.text;
  },
  methods: {
    extractContent(evt) {
      this.currentText = evt.target.innerText;
      this.evaluateValue();
    },
    evaluateValue: function() {
      if (this.storedText !== this.currentText && this.currentText.length > 0) {
        this.storedText = this.currentText;
        this.$emit("updated", this.currentText);

        if (this.clearOnInput) {
          this.currentText = "";
          this.storedText = "";
        }
      }
    }
  }
};
</script>

<style>
.invisible-input {
  outline: none;
  cursor: text;
}

.invisible-input[contenteditable="true"]:empty:before {
  content: attr(placeholder);
  color: #cecece;
}
</style>