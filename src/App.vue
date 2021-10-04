<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
var audio = new Audio('/sounds/song.mp3');
audio.play();
export default {
  name: 'App',
};
</script>
