<template>
  <el-container class="wrapper">
    <el-card class="focus-card">
      <div>
        <img src="@/assets/z-drive-logo-dark.svg" class="mb-3" />
        <el-input
          class="mb-3"
          placeholder="Bucket name"
          v-model="bucketName"
        />
        <el-button type="primary" @click="$router.push('explorer')">Get Started</el-button>
      </div>
    </el-card>
  </el-container>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation';

  export default {
    name: 'landing-page',
    components: {
      SystemInformation,
    },
    data() {
      return {
        bucketName: '',
      };
    },
    methods: {
      open(link) {
        this.$electron.shell.openExternal(link);
      },
    },
    watch: {
      bucketName() {
        console.log(this.bucketName);
        console.log(this.$store);
        this.$store.dispatch('setGoogleCloudBucket', this.bucketName);
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
