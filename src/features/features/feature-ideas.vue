<template>
  <div class="feature-ideas">
    <div class="container-fluid text-align: center;">
      <div class="row">
        <div class="feature-box col-12 col-md-6 col-xl-4 d-flex align-items-center">
          <div class="text-center w-100">
            <i class="fas fa-list-alt fa-fw"/>
            <h4>Finish what matters</h4>
            <p>Shine allows you to create lists of to-do's that help you finish what really matters, from daily planning to big events.</p>
          </div>
        </div>
        <div class="feature-box col-12 col-md-6 col-xl-4 d-flex align-items-center">
          <div class="text-center w-100">
            <i class="fas fa-mobile fa-fw"/>
            <h4>Works on every device</h4>
            <p>Start planning on your tablet in bed, continue on your laptop at work and update your progress on your phone at lunch.</p>
          </div>
        </div>
        <div class="feature-box col-12 col-md-6 col-xl-4 d-flex align-items-center">
          <div class="text-center w-100">
            <i class="fas fa-camera fa-fw"/>
            <h4>Customise your lists</h4>
            <p>Planning your summer holiday? Why not make your list look like the place you want to go by adding a stunning cover photo.</p>
          </div>
        </div>
        <div class="feature-box col-12 col-md-6 col-xl-4 d-flex align-items-center">
          <div class="text-center w-100">
            <i class="fas fa-chart-line fa-fw"/>
            <h4>Track your progress</h4>
            <p>We always show you how far away you are from completing your list, and when you do; lets get it completed and out of the way.</p>
          </div>
        </div>
        <div class="feature-box col-12 col-md-6 col-xl-4 d-flex align-items-center">
          <div class="text-center w-100">
            <i class="fas fa-search fa-fw"/>
            <h4>Powerful search</h4>
            <p>Finished a list but can't remember exactly what you needed to do, no problem; Shine gives you powerful search tools so you can always find what you need.</p>
          </div>
        </div>
        <div class="feature-box col-12 col-md-6 col-xl-4 d-flex align-items-center">
          <div class="text-center w-100">
            <i class="fas fa-glasses fa-fw"/>
            <h4>Easy to focus</h4>
            <p>Shine has some great features, but we don't clutter your workflow, we help you to quickly achieve your goals by keeping things simple and giving you just what you need.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.feature-ideas {
  background-color: $primary-background-colour;
}

.feature-box {
  background-color: white;
  color: black;
  height: 250px;
  padding: 20px;
  border-bottom: 1px solid $primary-border-colour;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: $primary-background-highlight-colour;
  }
  i.fas {
    font-size: 45px;
    margin-bottom: 25px;
  }

  h4 {
    margin-bottom: 15px;
  }
}
</style>