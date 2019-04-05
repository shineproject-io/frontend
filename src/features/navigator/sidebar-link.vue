<template>
  <router-link :to="route" class="sidebar-link p-3 d-flex align-items-center link-border">
    <i class="menu-item-icon fa-fw mr-3" v-bind:class="icon"/>
    <div class="flex-grow-1">
      <p class="mb-0">{{title}}</p>
      <p href="#" class="font-weight-light mb-0">
        <span class="mr-2">{{description}}</span>
        <i class="sidebar-chevron fas fa-chevron-right fa-fw text-muted"/>
      </p>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    route: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  }
};
</script>

<style>
.sidebar-link {
  border-left: 4px solid transparent;
  border-bottom: 1px solid #f2f2f2;
  transition: border-color 0.2s ease-in-out;
  color: black;
  border-radius: 3px;
}

.menu-item-icon {
  width: 40px;
  height: 40px;
  font-size: 18px;
  padding-top: 10px;
}

.sidebar-chevron{
  font-size: 11px;
}

.sidebar-link:hover {
  text-decoration: none;
}

.sidebar-link:hover:not(.active) {
  border-left: 4px solid #e5b25d;
}

.sidebar-link.active {
  border-left: 4px solid #e07a5f;
}

.sidebar-link .fa-chevron-right {
  transition: padding-left 0.2s ease-in-out;
}

.sidebar-link:hover .fa-chevron-right {
  padding-left: 7px;
}
</style>