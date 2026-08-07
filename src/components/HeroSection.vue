<template>
  <section class="relative min-h-[640px] lg:min-h-[700px] flex items-center justify-center overflow-hidden bg-[#061916]">
    <!-- Background Image & Overlay -->
    <div class="absolute inset-0 z-0">
      <img
        src="@/assets/card_image.jpg"
        alt="Najaf Shrine Background"
        class="w-full h-full object-cover object-center filter brightness-[0.38] contrast-125"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-[#061916] via-[#061916]/60 to-transparent"></div>
      <div class="absolute inset-0 bg-radial from-transparent via-[#061916]/40 to-[#061916]"></div>
    </div>

    <!-- Main Content Container -->
    <div class="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <!-- Left Hero Text Column -->
        <div class="lg:col-span-7 space-y-6 text-left" :class="{ 'text-right': isRtl }">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/30 text-[#E5C483] text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
            <v-icon size="14" color="#C5A059">mdi-star-four-points-outline</v-icon>
            <span>EST. 1989 • Global Islamic Organization</span>
          </div>

          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-white tracking-tight leading-tight">
            {{ t('hero.tagline') }}
            <span class="block text-transparent bg-clip-text bg-gradient-to-r from-[#E5C483] via-[#C5A059] to-[#8C6B28] mt-1">
              {{ t('hero.subTagline') }}
            </span>
          </h1>

          <p class="text-base sm:text-lg text-gray-300 max-w-2xl font-light leading-relaxed">
            {{ t('hero.description') }}
          </p>

          <!-- Hero CTA Buttons -->
          <div class="flex flex-wrap items-center gap-4 pt-4">
            <v-btn
              color="#C5A059"
              size="x-large"
              elevation="6"
              class="text-sm font-bold tracking-wider px-8 text-[#061916] hover:bg-[#E5C483] transition-all rounded-md"
              @click="$emit('open-programs')"
            >
              {{ t('hero.ourPrograms') }}
              <v-icon end size="18">mdi-arrow-right</v-icon>
            </v-btn>

            <v-btn
              variant="outlined"
              color="#C5A059"
              size="x-large"
              class="text-sm font-bold tracking-wider px-8 border-[#C5A059]/60 hover:bg-[#C5A059]/15 transition-all rounded-md text-white"
              @click="$emit('open-donate')"
            >
              <v-icon start size="18">mdi-heart-outline</v-icon>
              {{ t('hero.donateNow') }}
            </v-btn>
          </div>

          <!-- Social Links -->
          <div class="pt-6 border-t border-white/10 flex items-center gap-4 text-xs text-gray-400">
            <span>{{ t('hero.followUs') }}</span>
            <div class="flex items-center gap-3 text-white">
              <a href="#" class="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#C5A059] hover:text-[#C5A059] transition-all"><v-icon size="16">mdi-facebook</v-icon></a>
              <a href="#" class="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#C5A059] hover:text-[#C5A059] transition-all"><v-icon size="16">mdi-youtube</v-icon></a>
              <a href="#" class="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#C5A059] hover:text-[#C5A059] transition-all"><v-icon size="16">mdi-instagram</v-icon></a>
              <a href="#" class="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#C5A059] hover:text-[#C5A059] transition-all"><v-icon size="16">mdi-twitter</v-icon></a>
            </div>
          </div>
        </div>

        <!-- Right Column: Live Najaf Prayer Time Card -->
        <div class="lg:col-span-5">
          <div class="relative group bg-[#0A2924]/85 backdrop-blur-xl border border-[#C5A059]/30 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/80 hover:border-[#C5A059]/60 transition-all duration-500">

            <!-- Card Header -->
            <div class="flex justify-between items-start mb-6 border-b border-[#C5A059]/20 pb-4">
              <div>
                <span class="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-[#C5A059] uppercase">
                  <v-icon size="14">mdi-map-marker</v-icon>
                  {{ t('prayerCard.location') }}
                </span>
                <p class="text-xs text-gray-400 mt-1">{{ t('prayerCard.date') }}</p>
                <p class="text-[11px] text-gray-500">{{ t('prayerCard.gregorian') }}</p>
              </div>
              <div class="w-10 h-10 rounded-full bg-[#C5A059]/10 flex items-center justify-center border border-[#C5A059]/30 text-[#C5A059]">
                <v-icon size="20">mdi-clock-outline</v-icon>
              </div>
            </div>

            <!-- Prayer Content -->
            <div class="space-y-4 text-center my-6">
              <span class="text-xs uppercase tracking-widest text-gray-400 font-semibold">{{ t('prayerCard.nextPrayer') }}</span>
              <h3 class="text-3xl font-bold font-serif text-white tracking-wide">{{ t('prayerCard.prayerName') }}</h3>
              <div class="text-4xl sm:text-5xl font-black tracking-tight text-[#E5C483] font-mono py-1">
                {{ t('prayerCard.time') }}
              </div>
              
              <!-- Countdown Display -->
              <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#133E37] border border-[#C5A059]/30 text-xs text-gray-300 font-mono">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{{ t('prayerCard.countdownLabel') }}: <strong>{{ countdownText }}</strong></span>
              </div>
            </div>

            <!-- Card Action Footer -->
            <div class="pt-4 border-t border-[#C5A059]/20">
              <v-btn
                block
                variant="tonal"
                color="#C5A059"
                class="text-xs font-bold tracking-wider py-3 border border-[#C5A059]/30 hover:bg-[#C5A059] hover:text-[#061916] transition-all rounded-xl"
                @click="$emit('open-prayer-times')"
              >
                {{ t('prayerCard.viewPrayerTimes') }}
                <v-icon end size="16">mdi-arrow-right</v-icon>
              </v-btn>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

defineEmits(['open-programs', 'open-donate', 'open-prayer-times'])

const { t, locale } = useI18n()

const isRtl = computed(() => locale.value === 'ar')

const countdownText = ref('02:35:41')

let timer: any = null

onMounted(() => {
  let seconds = 2 * 3600 + 35 * 60 + 41
  timer = setInterval(() => {
    if (seconds > 0) {
      seconds--
      const hrs = Math.floor(seconds / 3600).toString().padStart(2, '0')
      const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0')
      const secs = (seconds % 60).toString().padStart(2, '0')
      countdownText.value = `${hrs}:${mins}:${secs}`
    } else {
      seconds = 4 * 3600
    }
  }, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>
