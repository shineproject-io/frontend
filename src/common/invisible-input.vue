<template>
  <form v-on:submit.prevent="evaluateValue">
    <div
      ref="editableField"
      class="invisible-input"
      contenteditable="true"
      v-on:keydown.enter.stop="$refs.editableField.blur()"
      v-on:blur="extractContent"
      v-html="currentText"
      v-focus="isFocused"
      v-bind:class="classList"
      :placeholder="placeholder"
    ></div>
  </form>
</template>

<script>
export default {
  name: "invisible-input",
  directives: {
    focus: {
      inserted(el, binding) {
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
  data() {
    return {
      currentText: "",
      storedText: ""
    };
  },
  mounted() {
    this.currentText = this.text;
    this.storedText = this.text;
  },
  methods: {
    extractContent(evt) {
      this.currentText = evt.target.innerText;
      this.evaluateValue();
    },
    evaluateValue() {
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