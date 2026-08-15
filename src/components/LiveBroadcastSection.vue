<template>
  <section class="relative py-24 bg-[#030E0C] overflow-hidden border-t border-b border-[#C5A059]/25 select-none">
    
    <!-- Animated Atmospheric Glowing Orbs -->
    <div class="absolute -top-40 -left-40 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
    <div class="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-[#C5A059]/10 rounded-full blur-[140px] pointer-events-none"></div>

    <!-- Floating Animated Background Particles / Decorative Rings -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
      <div class="absolute top-12 left-1/4 w-32 h-32 rounded-full border border-[#C5A059]/20 animate-spin" style="animation-duration: 25s;"></div>
      <div class="absolute bottom-16 right-1/4 w-48 h-48 rounded-full border border-red-500/20 animate-spin" style="animation-duration: 35s; animation-direction: reverse;"></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        <!-- Column 1: Video Cinema Player Showcase (Span 7) -->
        <div class="lg:col-span-7 order-2 lg:order-1">
          <div class="relative group/player rounded-3xl p-1.5 sm:p-2.5 bg-gradient-to-br from-[#C5A059]/50 via-red-600/30 to-[#0A2924] shadow-2xl shadow-black/80">
            
            <!-- Video Screen Container -->
            <div
              @click="openLiveStream"
              class="relative aspect-video w-full rounded-2xl overflow-hidden bg-black cursor-pointer group"
            >
              <!-- Cover Image with Dynamic Zoom -->
              <img
                :src="cms.streamSettings.coverImage || defaultHeroImg"
                alt="Live Stream Cover"
                class="w-full h-full object-cover object-center filter brightness-90 group-hover:scale-105 transition-transform duration-700"
              />

              <!-- Dark Vignette Overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40 group-hover:bg-black/20 transition-all duration-300"></div>

              <!-- Top Floating Badges: Live Status + Audio Waveform -->
              <div class="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                
                <!-- Live Pulse Badge -->
                <div class="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-red-500/50 shadow-lg">
                  <span class="relative flex h-3 w-3">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                  </span>
                  <span class="text-xs font-mono font-bold tracking-wider text-white uppercase">
                    {{ cms.streamSettings.isLiveNow ? (isRtl ? 'بث حي ومباشر' : 'LIVE NOW') : (isRtl ? 'تسجيل البث' : 'RECORDED') }}
                  </span>
                </div>

                <!-- Animated Equalizer Soundwave Bars -->
                <div class="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-[#C5A059]/40">
                  <span class="text-[10px] font-mono text-[#E5C483] font-bold mr-1.5">{{ isRtl ? 'صوت مباشر' : 'AUDIO' }}</span>
                  <div class="flex items-end gap-0.5 h-4">
                    <span class="w-1 bg-[#C5A059] rounded-full animate-wave-1"></span>
                    <span class="w-1 bg-[#E5C483] rounded-full animate-wave-2"></span>
                    <span class="w-1 bg-[#C5A059] rounded-full animate-wave-3"></span>
                    <span class="w-1 bg-[#E5C483] rounded-full animate-wave-4"></span>
                    <span class="w-1 bg-[#C5A059] rounded-full animate-wave-1"></span>
                  </div>
                </div>

              </div>

              <!-- Center Pulsing Play Button -->
              <div class="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div class="relative flex items-center justify-center">
                  <!-- Outer Pulsing Ripple Rings -->
                  <div class="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-red-600/30 animate-ping opacity-60"></div>
                  <div class="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#C5A059]/40 animate-pulse"></div>

                  <!-- Central Red & Gold Button -->
                  <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-red-600 to-red-800 border-2 border-[#E5C483] text-white flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:from-[#C5A059] group-hover:to-[#8C6B28] group-hover:text-[#061916] transition-all duration-300">
                    <v-icon size="36" class="ml-1 sm:text-[42px]">mdi-play</v-icon>
                  </div>
                </div>
              </div>

              <!-- Bottom Bar on Video: Viewers & Studio Location -->
              <div class="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10 text-xs">
                <div class="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 text-gray-200">
                  <v-icon size="16" color="#E5C483">mdi-account-group-outline</v-icon>
                  <span class="font-mono font-semibold">{{ cms.streamSettings.viewersCount || '3,850+' }}</span>
                  <span class="text-gray-400 font-light">{{ isRtl ? 'مشاهد' : 'viewers' }}</span>
                </div>

                <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 text-[#E5C483] font-mono text-[11px]">
                  <v-icon size="14" color="#C5A059">mdi-map-marker-radius</v-icon>
                  <span>{{ isRtl ? (cms.streamSettings.locationAr || 'النجف الأشرف • لندن') : (cms.streamSettings.locationEn || 'Najaf • London') }}</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        <!-- Column 2: Text Content & Action Links (Span 5) -->
        <div class="lg:col-span-5 order-1 lg:order-2 space-y-6 text-left" :class="{ 'text-right': isRtl }">
          
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#061916] border border-[#C5A059]/40 text-[#E5C483] text-xs font-semibold uppercase tracking-wider shadow-md">
            <v-icon size="16" color="#EF4444">mdi-youtube</v-icon>
            <span>{{ isRtl ? 'البث الفضائي والرقمي المباشر' : 'GLOBAL LIVE BROADCAST' }}</span>
          </div>

          <!-- Section Title -->
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-white tracking-tight leading-tight">
            {{ isRtl ? (cms.streamSettings.titleAr || 'المجالس والمحاضرات اليومية المباشرة') : (cms.streamSettings.titleEn || 'Daily Live Majalis & Lectures') }}
          </h2>

          <!-- Subtitle -->
          <p class="text-base sm:text-lg text-[#E5C483] font-serif font-medium">
            {{ isRtl ? (cms.streamSettings.subtitleAr || 'بث مباشر من العتبات المقدسة ومراكز مؤسسة الخوئي') : (cms.streamSettings.subtitleEn || 'Global Broadcast from Holy Shrines & Al-Khoei Centers') }}
          </p>

          <!-- Description Caption -->
          <p class="text-sm sm:text-base text-gray-300 font-light leading-relaxed">
            {{ isRtl ? (cms.streamSettings.captionAr || 'تابعوا البث المباشر اليومي للمجالس الحسينية، والمحاضرات الفقهية، والندوات الفكرية المنقولة مباشرة بأعلى جودة من استوديوهات النجف الأشرف ولندن.') : (cms.streamSettings.captionEn || 'Watch our live daily religious sessions, jurisprudence seminars, and commemorative programs streamed directly from the Holy City of Najaf and London studios.') }}
          </p>

          <!-- Interactive Action Buttons -->
          <div class="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            
            <!-- Primary Live Broadcast Button (YouTube Red / Gold Gradient) -->
            <button
              @click="openLiveStream"
              class="px-8 py-4 bg-gradient-to-r from-red-600 via-red-700 to-red-900 hover:from-[#E5C483] hover:via-[#C5A059] hover:to-[#8C6B28] text-white hover:text-[#061916] font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-2xl shadow-red-950/60 hover:shadow-[#C5A059]/30 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer group"
            >
              <v-icon size="22" class="text-white group-hover:text-[#061916] transition-colors">mdi-youtube</v-icon>
              <span>{{ isRtl ? 'شاهد البث على يوتيوب' : 'WATCH LIVE ON YOUTUBE' }}</span>
              <v-icon size="18" class="group-hover:translate-x-1 transition-transform">{{ isRtl ? 'mdi-arrow-left' : 'mdi-arrow-right' }}</v-icon>
            </button>

            <!-- Secondary Channel Button -->
            <a
              :href="cms.streamSettings.channelUrl || 'https://youtube.com/@alkhoeifoundation'"
              target="_blank"
              rel="noopener noreferrer"
              class="px-6 py-4 bg-[#061916] hover:bg-[#C5A059]/20 border border-[#C5A059]/40 hover:border-[#C5A059] text-gray-200 hover:text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg text-center"
            >
              <v-icon size="18" color="#C5A059">mdi-play-box-multiple-outline</v-icon>
              <span>{{ isRtl ? 'القناة الرسمية' : 'OFFICIAL CHANNEL' }}</span>
            </a>

          </div>

          <!-- Bottom Micro-Indicators -->
          <div class="pt-4 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-gray-400 font-mono">
            <div class="flex items-center gap-2">
              <v-icon size="16" color="#34D399">mdi-check-decagram</v-icon>
              <span>{{ isRtl ? 'بث بدقة 4K UHD' : '4K Ultra HD Stream' }}</span>
            </div>
            <div class="flex items-center gap-2">
              <v-icon size="16" color="#C5A059">mdi-translate</v-icon>
              <span>{{ isRtl ? 'ترجمة متعددة اللغات' : 'Multi-Language Audio' }}</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCmsStore } from '@/stores/cms'
import defaultHeroImg from '@/assets/card_image.jpg'

const emit = defineEmits(['open-modal'])

const { locale } = useI18n()
const cms = useCmsStore()

const isRtl = computed(() => locale.value === 'ar')

function openLiveStream() {
  const url = cms.streamSettings.streamUrl || 'https://www.youtube.com/watch?v=live'
  if (url.startsWith('http://') || url.startsWith('https://')) {
    window.open(url, '_blank')
  } else {
    emit('open-modal')
  }
}
</script>

<style scoped>
@keyframes wave-animation-1 {
  0%, 100% { height: 4px; }
  50% { height: 16px; }
}

@keyframes wave-animation-2 {
  0%, 100% { height: 14px; }
  50% { height: 6px; }
}

@keyframes wave-animation-3 {
  0%, 100% { height: 8px; }
  50% { height: 18px; }
}

@keyframes wave-animation-4 {
  0%, 100% { height: 16px; }
  50% { height: 8px; }
}

.animate-wave-1 {
  animation: wave-animation-1 1s ease-in-out infinite;
}

.animate-wave-2 {
  animation: wave-animation-2 1.2s ease-in-out infinite;
}

.animate-wave-3 {
  animation: wave-animation-3 0.8s ease-in-out infinite;
}

.animate-wave-4 {
  animation: wave-animation-4 1.4s ease-in-out infinite;
}
</style>
