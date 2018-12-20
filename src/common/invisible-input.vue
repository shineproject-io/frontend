<template>
  <form v-on:submit.prevent="evaluateValue">
    <div
      :id="'field-' + _uid"
      ref="editableField"
      contenteditable="true"
      v-on:blur="extractContent"
      v-on:keydown.enter.stop="$refs.editableField.blur()"
      class="invisible-input w-100"
      v-bind:class="classList"
      :style="maxHeightStyle"
      :placeholder="placeholder"
      v-html="currentText"
      v-focus="isFocused"
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
    required: {
      type: Boolean,
      default: false
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
    maxHeight: {
      type: Number,
      default: 0
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
  computed: {
    maxHeightStyle: function() {
      if (this.maxHeight > 0) {
        return "max-height: " + this.maxHeight + "px;";
      }
    }
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
  background-color: transparent;
  border: 0;
  outline: none;
  font-family: unset;
  cursor: text;
}

.invisible-input[contenteditable="true"]:empty:before {
  content: attr(placeholder);
  display: block;
  color: #cecece;
}
</style>