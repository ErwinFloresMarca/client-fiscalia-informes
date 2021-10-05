<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

const audio = new Audio('/sounds/song.mp3');
export default {
  name: 'App',
  data() {
    return {
      audioPlayed: false,
    };
  },
  mounted() {
    document.body.addEventListener('click', () => {
      if (audio.paused && !this.audioPlayed) {
        audio.play().then(() => {
          this.audioPlayed = true;
          console.log('play audio');
        }).catch(err => console.log(err));
      }
    });
  },
};
</script>
