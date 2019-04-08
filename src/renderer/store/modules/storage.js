const state = {
  googleCloudBucket: '',
};

const mutations = {
  SET_GOOGLE_CLOUD_BUCKET(state, bucketName) {
    console.log(state, bucketName);
    state.googleCloudBucket = bucketName;
  },
};

const actions = {
  setGoogleCloudBucket({ commit }, bucketName) {
    console.log(commit, bucketName);
    commit('SET_GOOGLE_CLOUD_BUCKET', bucketName);
  },
};

export default {
  strict: true,
  state,
  mutations,
  actions,
};
