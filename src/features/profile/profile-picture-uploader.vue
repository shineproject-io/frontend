<template>
  <div class="template">
    <div class="profile-picture-uploader">
      <img
        :src="imagePath"
        :width="size"
        :height="size"
        class="profile-picture thumbnail rounded-circle"
      >
      <div
        v-if="canUpload"
        class="overlay"
        style="display: none;"
        title="Upload a new picture"
        v-on:click.prevent="$refs.uploadPictureModal.show"
      >
        <i class="upload-icon fas fa-image fa-fw"/>
      </div>
    </div>

    <form v-on:submit.prevent="submit">
      <modal ref="uploadPictureModal">
        <h6 slot="header" class="mb-0">Change your profile picture</h6>
        <div slot="body" class="p-3">
          <p>Upload a new profile picture by attaching a file below.</p>
          <error-renderer v-if="statusCode !== 0" :errorMessage="errorMessage"/>

          <div class="input-group mb-3">
            <div class="custom-file">
              <input
                type="file"
                class="custom-file-input"
                v-on:change="fileInputChange($event.target.files)"
              >
              <label class="custom-file-label" for="inputGroupFile01">{{imageFileName}}</label>
            </div>
          </div>
        </div>
        <div slot="footer">
          <loading-button :isLoading="isSubmitting" text="Upload" icon="fas fa-upload" class="mr-2"></loading-button>
          <button
            class="btn btn-secondary"
            v-on:click.prevent="$refs.uploadPictureModal.hide()"
          >Cancel</button>
        </div>
      </modal>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 100
    },
    canUpload: {
      type: Boolean,
      default: false
    },
    imagePath: {
      type: String,
      default:
        "https://shinestorage.azureedge.net/productimages/medium-avatar.png"
    }
  },
  data() {
    return {
      statusCode: 0,
      imageFileName: "Choose a picture...",
      file: null,
      isSubmitting: false
    };
  },
  methods: {
    submit() {
      if (this.isSubmitting) {
        return;
      }

      if (!this.file) {
        this.statusCode = -1;
        return;
      }

      this.isSubmitting = true;
      this.statusCode = 0;

      let formData = new FormData();
      formData.append("file", this.file);

      this.$http
        .put("/userprofiles/me/profilepicture/", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(() => {
          this.imageFileName = "Choose a picture...";
          this.isSubmitting = false;
          this.$refs.uploadPictureModal.hide();
          this.$store.commit("setUserProfile", null);
          this.$root.$emit("user-profile-updated");
        })
        .catch(error => {
          this.statusCode = error.response.status;
          this.isSubmitting = false;
        });

      return false;
    },
    fileInputChange(fileList) {
      this.imageFileName = fileList[0].name;
      this.file = fileList[0];
    }
  },
  computed: {
    errorMessage() {
      switch (this.statusCode) {
        case -1:
          return "Please attach a picture";
        case 500:
          return "Something went wrong, we are investigating";
        case 415:
          return "Please make sure your picture is .PNG, .JPG or .GIF";
        case 413:
          return "Please ensure the picture is 3MB or less";
        default:
          return "Something went wrong, we are investigating";
      }
    }
  }
};
</script>

<style>
.profile-picture-uploader {
  position: relative;
  border-radius: 50%;
}

.profile-picture-uploader:hover .overlay {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  display: initial !important;
  cursor: pointer;
}

.upload-icon {
  position: absolute;
  left: 32.5px;
  top: 35px;
  font-size: 30px;
}

img.profile-picture {
  object-fit: cover;
}
</style>
