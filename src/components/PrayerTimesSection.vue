<template>
  <section class="py-16 bg-[#041210] border-t border-b border-[#C5A059]/25 text-gray-100 relative z-30 shadow-2xl overflow-hidden">
    
    <!-- Background Radiant Ambience -->
    <div class="absolute -top-32 left-10 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute -bottom-32 right-10 w-96 h-96 bg-[#0A2924] rounded-full blur-3xl pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <!-- 2-Column Split Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
        
        <!-- SIDE 1: Prayer Times Panel (Span 6) -->
        <div class="lg:col-span-6 bg-[#061916] border border-[#C5A059]/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group/prayer">
          
          <div class="space-y-6">
            <!-- Header Bar: Title & Countdown -->
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-5">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#C5A059] to-[#8C6B28] p-0.5 shadow-lg">
                  <div class="w-full h-full rounded-2xl bg-[#061916] flex items-center justify-center text-[#E5C483]">
                    <v-icon size="24">mdi-clock-time-four-outline</v-icon>
                  </div>
                </div>
                <div>
                  <h3 class="text-lg sm:text-xl font-bold font-serif text-white tracking-wide uppercase">
                    {{ isRtl ? 'مواقيت الصلاة اليومية' : 'PRAYER TIMES' }}
                  </h3>
                  <p class="text-xs text-[#E5C483] font-mono flex items-center gap-1 mt-0.5">
                    <v-icon size="14" color="#C5A059">mdi-map-marker</v-icon>
                    <span>{{ locationText }}</span>
                  </p>
                </div>
              </div>

              <!-- Next Prayer Countdown Pill -->
              <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#041210] border border-[#C5A059]/40 text-xs font-mono shadow-md">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span class="text-gray-300">{{ isRtl ? 'الصلاة القادمة:' : 'Next in:' }} <strong class="text-[#E5C483] font-bold">{{ countdownText }}</strong></span>
              </div>
            </div>

            <!-- Prayer Cards 2x2 Grid -->
            <div class="grid grid-cols-2 gap-4">
              <div
                v-for="p in prayerTimesList"
                :key="p.key"
                :class="[
                  'relative rounded-2xl p-4 sm:p-5 text-center transition-all duration-300 flex flex-col items-center justify-between min-h-[120px]',
                  p.isActive
                    ? 'bg-gradient-to-br from-[#0A2924] via-[#133E37] to-[#061916] border-2 border-[#C5A059] shadow-xl shadow-[#C5A059]/20 scale-[1.02]'
                    : 'bg-[#041210] border border-white/10 hover:border-[#C5A059]/40'
                ]"
              >
                <!-- Active Indicator -->
                <div
                  v-if="p.isActive"
                  class="absolute -top-2.5 bg-gradient-to-r from-[#E5C483] via-[#C5A059] to-[#8C6B28] text-[#061916] text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-md font-mono"
                >
                  {{ isRtl ? 'الوقت الحالي' : 'ACTIVE' }}
                </div>

                <div :class="[ 'mb-1', p.isActive ? 'text-[#E5C483]' : 'text-[#C5A059]' ]">
                  <v-icon size="24">{{ p.icon }}</v-icon>
                </div>

                <h4 :class="[ 'text-xs font-bold font-serif uppercase tracking-wider', p.isActive ? 'text-white' : 'text-gray-300' ]">
                  {{ t(p.titleKey) }}
                </h4>

                <div :class="[ 'text-lg sm:text-xl font-black font-mono tracking-tight mt-1', p.isActive ? 'text-[#E5C483]' : 'text-gray-100' ]">
                  {{ p.time }}
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom Method Info -->
          <div class="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400 font-mono">
            <span>{{ isRtl ? 'الحساب الفقهي: مركز الإمام الخوئي (قدس سره)' : 'Method: Imam Al-Khoei Calculations' }}</span>
            <span class="text-[#E5C483] font-bold">{{ nextPrayerName }}</span>
          </div>

        </div>

        <!-- SIDE 2: Latest Occasions & News Carousel (Span 6) -->
        <div class="lg:col-span-6 bg-[#061916] border border-[#C5A059]/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group/news">
          
          <!-- Header Bar: Title & Arrows -->
          <div class="flex items-center justify-between border-b border-white/10 pb-5 mb-5">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#C5A059] to-[#8C6B28] p-0.5 shadow-lg">
                <div class="w-full h-full rounded-2xl bg-[#061916] flex items-center justify-center text-[#E5C483]">
                  <v-icon size="24">mdi-newspaper-variant-outline</v-icon>
                </div>
              </div>
              <div>
                <h3 class="text-lg sm:text-xl font-bold font-serif text-white tracking-wide uppercase">
                  {{ isRtl ? 'أحدث الأخبار والمناسبات' : 'LATEST OCCASIONS & NEWS' }}
                </h3>
                <p class="text-xs text-[#E5C483] font-mono">
                  {{ isRtl ? 'المجالس والفعاليات الجارية والمقبلة' : 'Current & Upcoming Commemorations' }}
                </p>
              </div>
            </div>

            <!-- Carousel Nav Arrows -->
            <div class="flex items-center gap-2">
              <button
                @click="prevNews"
                class="w-9 h-9 rounded-full bg-[#041210] border border-white/20 text-[#E5C483] hover:border-[#C5A059] hover:bg-[#C5A059] hover:text-[#061916] transition-all flex items-center justify-center cursor-pointer active:scale-95"
                :title="isRtl ? 'السابق' : 'Previous'"
              >
                <v-icon size="18">{{ isRtl ? 'mdi-chevron-right' : 'mdi-chevron-left' }}</v-icon>
              </button>
              <button
                @click="nextNews"
                class="w-9 h-9 rounded-full bg-[#041210] border border-white/20 text-[#E5C483] hover:border-[#C5A059] hover:bg-[#C5A059] hover:text-[#061916] transition-all flex items-center justify-center cursor-pointer active:scale-95"
                :title="isRtl ? 'التالي' : 'Next'"
              >
                <v-icon size="18">{{ isRtl ? 'mdi-chevron-left' : 'mdi-chevron-right' }}</v-icon>
              </button>
            </div>
          </div>

          <!-- Carousel News Card Body -->
          <div class="flex-1 flex flex-col justify-between">
            <Transition name="fade-news" mode="out-in">
              <div :key="currentNewsIndex" class="space-y-4">
                
                <!-- Card Image Box with Category Tag -->
                <div class="relative h-44 sm:h-48 w-full rounded-2xl overflow-hidden bg-black border border-white/10">
                  <img
                    :src="currentNews.image || defaultHeroImg"
                    :alt="currentNews.title"
                    class="w-full h-full object-cover object-center filter brightness-95 hover:scale-105 transition-transform duration-700"
                  />
                  
                  <!-- Tag Badge -->
                  <div class="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#C5A059]/40 text-[#E5C483] font-mono text-[10px] font-bold uppercase tracking-wider">
                    {{ currentNews.month }} {{ currentNews.day }} • {{ currentNews.category }}
                  </div>

                  <div class="absolute inset-0 bg-gradient-to-t from-[#061916] via-transparent to-transparent"></div>
                </div>

                <!-- Text Info -->
                <div class="space-y-2 text-left" :class="{ 'text-right': isRtl }">
                  <h4 class="text-base sm:text-lg font-bold font-serif text-white hover:text-[#E5C483] transition-colors leading-snug">
                    {{ currentNews.title }}
                  </h4>
                  <p class="text-xs sm:text-sm text-gray-300 font-light leading-relaxed line-clamp-3">
                    {{ currentNews.summary }}
                  </p>
                </div>

              </div>
            </Transition>

            <!-- Bottom Pagination Indicators -->
            <div class="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
              <div class="flex items-center gap-1.5">
                <button
                  v-for="(_, idx) in newsItems"
                  :key="idx"
                  @click="currentNewsIndex = idx"
                  :class="[
                    'h-2 rounded-full transition-all duration-300 cursor-pointer',
                    currentNewsIndex === idx ? 'w-6 bg-[#C5A059]' : 'w-2 bg-white/30 hover:bg-white/60'
                  ]"
                ></button>
              </div>

              <a
                href="#news"
                class="text-xs text-[#E5C483] hover:text-white font-semibold font-serif flex items-center gap-1 transition-colors"
              >
                <span>{{ isRtl ? 'عرض كافة الأخبار والمناسبات' : 'View All Occasions' }}</span>
                <v-icon size="14">{{ isRtl ? 'mdi-arrow-left' : 'mdi-arrow-right' }}</v-icon>
              </a>
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
import { useCmsStore } from '@/stores/cms'
import defaultHeroImg from '@/assets/card_image.jpg'

const { t, locale } = useI18n()
const cms = useCmsStore()

const isRtl = computed(() => locale.value === 'ar')

const locationText = computed(() => {
  return isRtl.value ? cms.prayerTimes.locationAr : cms.prayerTimes.locationEn
})

// Prayer Times Logic
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

// Occasions / News Carousel Logic
const currentNewsIndex = ref(0)
let newsAutoplayTimer: any = null

const newsItems = computed(() => {
  if (!cms.newsList || cms.newsList.length === 0) {
    return [
      {
        id: 1,
        month: 'MAY',
        day: '28',
        category: 'OCCASION',
        title: isRtl.value ? 'مجلس إحياء ذكرى استشهاد الرسول الأعظم (ص)' : 'Commemoration Majlis - Martyrdom of Prophet Muhammad (saw)',
        summary: isRtl.value ? 'تقيم مؤسسة الخوئي مجالس العزاء والمحاضرات التأبينية بحضور نخبة من العلماء والخطباء.' : 'Al-Khoei Foundation holds special commemorative lectures and mourning sessions.',
        image: defaultHeroImg,
      }
    ]
  }
  return cms.newsList.map(n => ({
    id: n.id,
    month: n.month,
    day: n.day,
    category: n.category,
    title: isRtl.value ? n.titleAr : n.titleEn,
    summary: isRtl.value ? n.summaryAr : n.summaryEn,
    image: n.image || defaultHeroImg,
  }))
})

const currentNews = computed(() => {
  const list = newsItems.value
  if (currentNewsIndex.value >= list.length) {
    currentNewsIndex.value = 0
  }
  return list[currentNewsIndex.value] || list[0]
})

function nextNews() {
  currentNewsIndex.value = (currentNewsIndex.value + 1) % newsItems.value.length
}

function prevNews() {
  currentNewsIndex.value = (currentNewsIndex.value - 1 + newsItems.value.length) % newsItems.value.length
}

function startNewsAutoplay() {
  if (newsAutoplayTimer) clearInterval(newsAutoplayTimer)
  newsAutoplayTimer = setInterval(() => {
    nextNews()
  }, 6000)
}

function pauseNewsAutoplay() {
  if (newsAutoplayTimer) clearInterval(newsAutoplayTimer)
}

onMounted(() => {
  updatePrayerStatus()
  intervalId = setInterval(updatePrayerStatus, 1000)
  startNewsAutoplay()
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
  pauseNewsAutoplay()
})
</script>

<style scoped>
.fade-news-enter-active,
.fade-news-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.fade-news-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.fade-news-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
