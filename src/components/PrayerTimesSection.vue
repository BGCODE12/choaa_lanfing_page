<template>
  <section class="py-10 bg-gradient-to-b from-[#F9F6F0] via-[#F4EFE6] to-[#F9F6F0] border-y border-[#C5A059]/30 text-gray-900 relative z-30 shadow-md overflow-hidden">
    
    <!-- Decorative Islamic Geometry Subtle Background -->
    <div class="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#061916_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <!-- Top Title & Location Bar -->
      <div class="flex flex-col sm:flex-row justify-between items-center mb-7 gap-4 text-center sm:text-left" :class="{ 'sm:text-right': isRtl }">
        <div class="flex items-center gap-3.5">
          <div class="w-11 h-11 rounded-full bg-gradient-to-br from-[#C5A059] to-[#8C6B28] p-0.5 shadow-md">
            <div class="w-full h-full rounded-full bg-[#061916] flex items-center justify-center text-[#E5C483]">
              <v-icon size="22">mdi-clock-time-four-outline</v-icon>
            </div>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-base sm:text-lg font-extrabold font-serif text-[#061916] tracking-wider uppercase">
                {{ t('prayerSection.title') }}
              </h3>
              <span class="inline-block w-2 h-2 rounded-full bg-[#C5A059]"></span>
            </div>
            <p class="text-xs text-[#7A5B1E] font-semibold mt-0.5 flex items-center gap-1 justify-center sm:justify-start">
              <v-icon size="14" color="#C5A059">mdi-map-marker</v-icon>
              <span>{{ locationText }}</span>
            </p>
          </div>
        </div>

        <!-- Next Prayer Countdown Tag -->
        <div class="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#061916] border border-[#C5A059]/50 text-xs text-gray-200 font-mono shadow-xl">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>{{ t('prayerSection.nextPrayerIn') }}: <strong class="text-[#E5C483] font-bold text-sm me-1">{{ countdownText }}</strong> ({{ nextPrayerName }})</span>
        </div>
      </div>

      <!-- Prayer Cards Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        
        <div
          v-for="p in prayerTimesList"
          :key="p.key"
          :class="[
            'relative rounded-2xl p-5 sm:p-6 text-center transition-all duration-500 flex flex-col items-center justify-between min-h-[135px] group',
            p.isActive
              ? 'bg-gradient-to-br from-[#061916] via-[#0A2924] to-[#133E37] text-white border-2 border-[#C5A059] shadow-2xl shadow-[#C5A059]/25 scale-105 z-10'
              : 'bg-white/90 backdrop-blur-md text-[#061916] border border-[#C5A059]/25 hover:border-[#C5A059] hover:bg-white shadow-sm hover:shadow-lg'
          ]"
        >
          <!-- Active Badge Indicator -->
          <div
            v-if="p.isActive"
            class="absolute -top-3 bg-gradient-to-r from-[#E5C483] via-[#C5A059] to-[#8C6B28] text-[#061916] text-[10px] font-black px-3.5 py-0.5 rounded-full uppercase tracking-widest shadow-md border border-white/20"
          >
            {{ t('prayerSection.activePrayer') }}
          </div>

          <!-- Icon -->
          <div :class="[ 'mb-2 transition-transform duration-300 group-hover:scale-110', p.isActive ? 'text-[#E5C483]' : 'text-[#C5A059]' ]">
            <v-icon size="28">{{ p.icon }}</v-icon>
          </div>

          <!-- Prayer Title -->
          <h4 :class="[ 'text-xs sm:text-sm font-bold uppercase tracking-wider font-serif', p.isActive ? 'text-gray-200' : 'text-gray-800' ]">
            {{ t(p.titleKey) }}
          </h4>

          <!-- Time Display -->
          <div :class="[ 'text-xl sm:text-2xl font-black font-mono tracking-tight mt-1', p.isActive ? 'text-[#E5C483]' : 'text-[#061916]' ]">
            {{ p.time }}
          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCmsStore } from '@/stores/cms'

const { t, locale } = useI18n()
const cms = useCmsStore()

const isRtl = computed(() => locale.value === 'ar')

const locationText = computed(() => {
  return isRtl.value ? cms.prayerTimes.locationAr : cms.prayerTimes.locationEn
})

function parseTimeToMinutes(timeStr: string): number {
  if (!timeStr) return 0
  const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i)
  if (!match) return 0
  let hrs = parseInt(match[1], 10)
  const mins = parseInt(match[2], 10)
  const ampm = match[3].toUpperCase()
  if (ampm === 'PM' && hrs < 12) hrs += 12
  if (ampm === 'AM' && hrs === 12) hrs = 0
  return hrs * 60 + mins
}

const rawTimes = computed(() => [
  { key: 'fajr', titleKey: 'prayerSection.fajr', time: cms.prayerTimes.fajr, minutes: parseTimeToMinutes(cms.prayerTimes.fajr), icon: 'mdi-weather-sunset-up' },
  { key: 'sunrise', titleKey: 'prayerSection.sunrise', time: cms.prayerTimes.sunrise, minutes: parseTimeToMinutes(cms.prayerTimes.sunrise), icon: 'mdi-weather-sunny' },
  { key: 'dhuhrain', titleKey: 'prayerSection.dhuhrain', time: cms.prayerTimes.dhuhrain, minutes: parseTimeToMinutes(cms.prayerTimes.dhuhrain), icon: 'mdi-weather-sunny-alert' },
  { key: 'maghribayn', titleKey: 'prayerSection.maghribayn', time: cms.prayerTimes.maghribayn, minutes: parseTimeToMinutes(cms.prayerTimes.maghribayn), icon: 'mdi-weather-sunset-down' },
])

const currentPrayerIndex = ref(2)
const countdownText = ref('01:24:10')
const nextPrayerName = ref('Dhuhrain')

let intervalId: any = null

function updatePrayerStatus() {
  const rTimes = rawTimes.value
  const now = new Date()
  const currentMinutes = now.getHours() * 60 + now.getMinutes()
  const currentSecs = now.getSeconds()

  let activeIdx = 0
  for (let i = 0; i < rTimes.length; i++) {
    if (currentMinutes >= rTimes[i].minutes) {
      activeIdx = i
    }
  }
  currentPrayerIndex.value = activeIdx

  const nextIdx = (activeIdx + 1) % rTimes.length
  nextPrayerName.value = t(rTimes[nextIdx].titleKey)

  let diffMins = rTimes[nextIdx].minutes - currentMinutes
  if (diffMins <= 0) diffMins += 24 * 60

  let totalSecs = diffMins * 60 - currentSecs
  if (totalSecs < 0) totalSecs = 0

  const hrs = Math.floor(totalSecs / 3600).toString().padStart(2, '0')
  const mins = Math.floor((totalSecs % 3600) / 60).toString().padStart(2, '0')
  const secs = (totalSecs % 60).toString().padStart(2, '0')

  countdownText.value = `${hrs}:${mins}:${secs}`
}

const prayerTimesList = computed(() => {
  return rawTimes.value.map((p, idx) => ({
    ...p,
    isActive: idx === currentPrayerIndex.value,
  }))
})

onMounted(() => {
  updatePrayerStatus()
  intervalId = setInterval(updatePrayerStatus, 1000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>
