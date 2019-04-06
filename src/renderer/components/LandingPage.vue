<template>
  <el-container class="wrapper">
    <el-card class="focus-card">
      <div>
        <img src="@/assets/third-party/logo_lockup_cloud_rgb.png" />
        <el-input class="mb-3" placeholder="Bucket name"></el-input>
        <el-button type="primary" @click="$router.push('explorer')">Get Started</el-button>
      </div>
    </el-card>
  </el-container>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation';

  export default {
    name: 'landing-page',
    components: { SystemInformation },
    methods: {
      open(link) {
        this.$electron.shell.openExternal(link);
      },
    },
  };
</script>

<style>
.wrapper {
  width: 100vw;
  height: 100vh;
}

.focus-card {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  width: 300px;
  left: calc(50% - 150px);
  text-align: center;
}
</style>
