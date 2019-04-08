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
      <el-main class="folder-view">
        <el-row :gutter="20">
          <el-col :sm="6" :lg="3" :xl="2" v-for="(contents, name) in activeDirectory.folders" :key="name">
            <a @click="activePath += `${name}/`">
              <el-card class="mb-3">
                <div>
                  <img :src="vsCodeIcons.getFolderIcon()" />
                  <p>{{ name }}</p>
                </div>
              </el-card>
            </a>
          </el-col>
        </el-row>
        <hr />
        <el-row :gutter="20">
          <el-col :sm="6" :lg="3" :xl="2" v-for="(file, i) in activeDirectory.files" :key="i">
            <a @click="onFileClick(file)">
              <el-card class="mb-3">
                <div>
                  <img :src="getFilePreview(file)" />
                  <p>{{ file }}</p>
                </div>
              </el-card>
            </a>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { ipcRenderer } from 'electron';

import vsCodeIcons from '@/assets/third-party/vscode-icons';

import {
  faFolder,
  faFolderOpen,
  faStar,
} from '@fortawesome/free-solid-svg-icons';

const path = require('path');

const fs = require('fs');

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

      imageExtensions: [
        'png',
        'jpg',
        'jpeg',
        'gif',
        'webp',
      ],

      activePath: '',
    };
  },

  computed: {
    activeDirectory() {
      const pathParts = this.activePath.split('/');

      let directory = this.files;

      for (let i = 0; i < pathParts.length; i += 1) {
        if (pathParts[i]) {
          directory = directory.folders[pathParts[i]];
        }
      }

      return directory;
    },
  },

  methods: {
    onFileClick(file) {
      console.log(this.activePath + file);

      ipcRenderer.send('googlecloud/download', `${this.activePath}${file}`);
    },

    getFilePreview(file) {
      const fileType = path.extname(file).replace('.', '').toLowerCase();

      if (this.imageExtensions.includes(fileType)) {
        const imagePreview = this.getImagePreview(file);

        if (imagePreview) {
          return imagePreview;
        }
      }

      return this.vsCodeIcons.getIcon(file);
    },

    getImagePreview(file) {
      if (fs.existsSync(`./local/${this.activePath}${file}`)) {
        return `./local/${this.activePath}${file}`;
      }
      return false;
    },
  },

  mounted() {
    ipcRenderer.send('googlecloud/list', 'all');

    ipcRenderer.on('googlecloud/list/response', (sender, response) => {
      this.files = response;
    });
  },
};
</script>

<style lang="scss">
@import '@/assets/variables.scss';

.folder-view {
  background-color: $dark-alt-background-color;
}
</style>
