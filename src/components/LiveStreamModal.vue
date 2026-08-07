<template>
  <v-dialog v-model="show" max-width="700" persistent>
    <div class="bg-[#0A2924] border border-[#C5A059]/40 rounded-2xl p-6 sm:p-8 text-white relative shadow-2xl">
      
      <!-- Close Button -->
      <button
        @click="close"
        class="absolute top-4 right-4 text-gray-400 hover:text-white w-8 h-8 rounded-full bg-white/5 flex items-center justify-center transition-colors z-20"
      >
        <v-icon size="18">mdi-close</v-icon>
      </button>

      <!-- Header -->
      <div class="flex items-center gap-3 mb-6 pb-4 border-b border-[#C5A059]/20">
        <div class="w-10 h-10 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500">
          <v-icon size="20">mdi-video-outline</v-icon>
        </div>
        <div>
          <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[9px] font-extrabold uppercase tracking-wider">
            LIVE BROADCAST
          </span>
          <h3 class="text-xl font-bold font-serif text-white mt-1">Daily Lectures & Majalis</h3>
        </div>
      </div>

      <!-- Video Stream Simulation Player -->
      <div class="relative w-full aspect-video bg-black rounded-xl overflow-hidden border border-[#C5A059]/30 mb-6 flex items-center justify-center group shadow-2xl">
        <img
          src="@/assets/card_image.jpg"
          alt="Live Video Stream"
          class="w-full h-full object-cover filter brightness-75 group-hover:scale-105 transition-transform duration-700"
        />

        <div class="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-4 text-center">
          <button class="w-16 h-16 rounded-full bg-[#C5A059] text-[#061916] flex items-center justify-center shadow-2xl hover:scale-110 transition-transform mb-3">
            <v-icon size="36">mdi-play</v-icon>
          </button>
          <p class="text-xs font-bold text-white tracking-wider">Streaming Live from Holy Najaf Al-Ashraf</p>
          <p class="text-[10px] text-gray-300 font-mono mt-1">HD 1080p • 2.4k Viewers Online</p>
        </div>
      </div>

      <!-- Footer Info -->
      <div class="flex justify-between items-center text-xs text-gray-400">
        <span>Language: Arabic / English Subtitles</span>
        <v-btn
          color="#C5A059"
          size="small"
          class="text-xs font-bold text-[#061916] rounded-lg"
          @click="close"
        >
          Close Player
        </v-btn>
      </div>

    </div>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue'])

const show = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

function close() {
  show.value = false
}
</script>
