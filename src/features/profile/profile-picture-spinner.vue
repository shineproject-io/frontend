<template>
  <div class="template">
    <div class="profile-picture-spinner mr-4">
      <i class="fas fa-spinner fa-spin fa-fw"/>
    </div>
  </div>
</template>

<style>
.profile-picture-spinner {
  position: relative;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  background: rgba(0, 0, 0, 0.5);
}

.profile-picture-spinner .fa-spinner {
  position: absolute;
  left: 32.5px;
  top: 35px;
  font-size: 30px;
}
</style>
