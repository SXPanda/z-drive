<template>
  <el-container>
    <el-aside class="panel full-height" style="width: 200px">
      <el-header>
        <h3>Bookmarks <fai class="primary" :icon="faStar"/></h3>
      </el-header>
      <el-menu>
        <el-submenu index="1">
          <template slot="title">
            <fai :icon="faFolder" />Useful Code
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">script.php</el-menu-item>
            <el-menu-item index="1-2">script.sql</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="panel">
        <h3>Folder name <router-link to="/">Home</router-link></h3>
      </el-header>
      <el-main>
        <el-row :gutter="20">
          <el-col :sm="6" :lg="3" :xl="3" v-for="(file, i) in files" :key="i">
            <el-card class="mb-3">
              <div>
                <img :src="vsCodeIcons.getIcon(file)" />
                <p>{{ file }}</p>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import vsCodeIcons from '@/assets/third-party/vscode-icons';

import {
  faFolder,
  faFolderOpen,
  faStar,
} from '@fortawesome/free-solid-svg-icons';

export default {
  name: 'page-explorer',
  data() {
    return {
      faFolder,
      faFolderOpen,
      faStar,
      vsCodeIcons,

      files: [
        'thing.php',
        'my.sql',
        'image.png',
        'swag.doc',
        'thing.php',
        'my.sql',
        'swag.doc',
        'thing.php',
        'my.sql',
        'image.png',
        'swag.doc',
        'something.unknown',
      ],
    };
  },
};
</script>

<style>

</style>
