<script setup lang="ts">
import { Ref, inject, ref } from "vue"
import mapJson from '../assets/map.json'

const currentCity = inject<Readonly<Ref<string>>>("currentCity")
const changeCity = inject<(name: string) => {}>("changeCity")!

const mapData = ref(mapJson)
</script>

<template>
  <div class="map-box">
    <svg baseprofile="tiny" fill="#6f9c76" height="1000" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round"
      stroke-width=".5" version="1.2" viewbox="0 0 1000 1000" width="1000" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path 
          v-for="item in mapData"
          :key="item.name"
          :d="item.path"
          @click="changeCity(item.name)"
          :fill="currentCity === item.name ? '#5B7553' : '#8EB897'"
        >
        </path>
      </g>
    </svg>
  </div>
</template>

<style scoped lang="scss">
.map-box {
  @include flex();
  width: 70%;
}

path {
  cursor: pointer;

  &:hover {
    fill: #5B7553;
    transition: 0.2s;
  }
}
</style>
