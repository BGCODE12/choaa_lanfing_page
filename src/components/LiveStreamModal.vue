<template>
  <v-dialog v-model="show" max-width="750" persistent>
    <div class="bg-[#0A2924] border border-[#C5A059]/40 rounded-2xl p-6 sm:p-8 text-white relative shadow-2xl">
      
      <!-- Close Button -->
      <button
        @click="close"
        class="absolute top-4 right-4 text-gray-400 hover:text-white w-8 h-8 rounded-full bg-white/5 flex items-center justify-center transition-colors z-20 cursor-pointer"
      >
        <v-icon size="18">mdi-close</v-icon>
      </button>

      <!-- Header -->
      <div class="flex items-center gap-3 mb-6 pb-4 border-b border-[#C5A059]/20">
        <div class="w-10 h-10 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500">
          <v-icon size="20">mdi-video-outline</v-icon>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <span
              v-if="cms.streamSettings.isLiveNow"
              class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[9px] font-extrabold uppercase tracking-wider animate-pulse"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-white"></span>
              LIVE BROADCAST
            </span>
            <span v-else class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gray-700 text-gray-300 text-[9px] font-extrabold uppercase tracking-wider">
              OFFLINE RECORDING
            </span>
          </div>
          <h3 class="text-xl font-bold font-serif text-white mt-1">
            {{ isRtl ? cms.streamSettings.titleAr : cms.streamSettings.titleEn }}
          </h3>
        </div>
      </div>

      <!-- Video Player Container (Iframe or High Quality Cover with Direct Link) -->
      <div class="relative w-full aspect-video bg-black rounded-xl overflow-hidden border border-[#C5A059]/30 mb-6 shadow-2xl group">
        
        <!-- Render Iframe if YouTube embed URL -->
        <iframe
          v-if="isEmbeddedVideo"
          :src="embedUrl"
          class="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>

        <!-- Otherwise Render Interactive Cover Image with Play Overlay -->
        <div v-else class="relative w-full h-full">
          <img
            :src="cms.streamSettings.coverImage || defaultHeroImg"
            alt="Live Stream Cover"
            class="w-full h-full object-cover filter brightness-75 group-hover:scale-105 transition-transform duration-700"
          />

          <div class="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-4 text-center">
            <a
              :href="cms.streamSettings.streamUrl || '#'"
              target="_blank"
              rel="noopener noreferrer"
              class="w-16 h-16 rounded-full bg-[#C5A059] text-[#061916] flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform mb-3 cursor-pointer"
            >
              <v-icon size="36">mdi-play</v-icon>
            </a>
            <p class="text-xs font-bold text-white tracking-wider">
              {{ isRtl ? cms.streamSettings.subtitleAr : cms.streamSettings.subtitleEn }}
            </p>
            <p class="text-[10px] text-[#E5C483] font-mono mt-1 flex items-center gap-1">
              <v-icon size="12" color="#E5C483">mdi-eye-outline</v-icon>
              <span>{{ cms.streamSettings.viewersCount || '2.4k' }} Viewers Online</span>
            </p>
          </div>
        </div>

      </div>

      <!-- Footer Info & External Link Button -->
      <div class="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-300">
        <span>{{ isRtl ? cms.streamSettings.subtitleAr : cms.streamSettings.subtitleEn }}</span>
        
        <div class="flex items-center gap-2">
          <a
            v-if="cms.streamSettings.streamUrl"
            :href="cms.streamSettings.streamUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="px-4 py-2 bg-white/10 border border-[#C5A059]/40 hover:bg-[#C5A059] hover:text-[#061916] text-[#E5C483] font-bold text-xs rounded-lg transition-all flex items-center gap-1.5"
          >
            <v-icon size="14">mdi-open-in-new</v-icon>
            <span>Open Channel</span>
          </a>

          <v-btn
            color="#C5A059"
            size="small"
            class="text-xs font-bold text-[#061916] rounded-lg"
            @click="close"
          >
            Close
          </v-btn>
        </div>
      </div>

    </div>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCmsStore } from '@/stores/cms'
import defaultHeroImg from '@/assets/card_image.jpg'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue'])

const { locale } = useI18n()
const cms = useCmsStore()

const isRtl = computed(() => locale.value === 'ar')

const show = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const isEmbeddedVideo = computed(() => {
  const url = cms.streamSettings.streamUrl
  return url && (url.includes('youtube.com/embed') || url.includes('player.vimeo.com'))
})

const embedUrl = computed(() => {
  let url = cms.streamSettings.streamUrl || ''
  if (url.includes('youtube.com/watch?v=')) {
    url = url.replace('watch?v=', 'embed/')
  }
  return url
})

function close() {
  show.value = false
}
</script>
