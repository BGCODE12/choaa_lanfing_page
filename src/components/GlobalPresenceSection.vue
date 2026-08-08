<template>
  <section id="institutions" class="py-20 bg-gradient-to-b from-[#041210] via-[#061916] to-[#041210] text-white border-b border-[#C5A059]/20 relative overflow-hidden">
    
    <!-- Subtle Background Glows -->
    <div class="absolute top-0 left-1/4 w-96 h-96 bg-[#C5A059]/10 rounded-full filter blur-3xl pointer-events-none"></div>
    <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full filter blur-3xl pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/40 text-[#E5C483] text-xs font-semibold uppercase tracking-widest backdrop-blur-md">
          <v-icon size="14" color="#C5A059">mdi-earth</v-icon>
          <span>{{ isRtl ? 'حضورنا العالمي' : 'OUR GLOBAL PRESENCE' }}</span>
        </div>

        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-white tracking-tight">
          {{ isRtl ? 'حضورنا العالمي وانتشار مؤسساتنا' : 'OUR GLOBAL NETWORK & INSTITUTIONS' }}
        </h2>

        <p class="text-sm sm:text-base text-gray-300 font-light leading-relaxed">
          {{ t('presence.subtitle') }}
        </p>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        <!-- Interactive World Map Card (Span 8) -->
        <div class="lg:col-span-8 bg-[#061916]/90 border border-[#C5A059]/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl backdrop-blur-md relative overflow-hidden group">
          
          <!-- Map Title & Active City Badge -->
          <div class="flex flex-wrap items-center justify-between gap-4 mb-6 z-20">
            <div class="flex items-center gap-3">
              <div class="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
              <span class="text-xs font-bold text-[#E5C483] uppercase tracking-wider font-mono">
                {{ isRtl ? 'خارطة التفاعل المباشرة' : 'Interactive World Map' }}
              </span>
            </div>

            <!-- Active Selected Pin Info -->
            <div class="px-3.5 py-1.5 rounded-xl bg-[#041210] border border-[#C5A059]/60 text-xs font-bold text-white flex items-center gap-2 shadow-lg animate-pulse">
              <v-icon size="16" color="#C5A059">mdi-map-marker-radius</v-icon>
              <span>{{ activeLocation.city }}, {{ activeLocation.country }}</span>
              <span class="text-[10px] text-[#C5A059] font-mono">({{ activeLocation.type }})</span>
            </div>
          </div>

          <!-- World Map Canvas Vector Container -->
          <div class="relative w-full h-[330px] sm:h-[390px] bg-[#030E0C]/85 rounded-2xl border border-white/10 flex items-center justify-center p-4 overflow-hidden shadow-inner">
            
            <!-- SVG Map Art & Arc Connections -->
            <svg viewBox="0 0 1000 500" class="w-full h-full object-contain filter drop-shadow-lg opacity-90">
              
              <!-- World Continent Shapes -->
              <g fill="#0A2D27" stroke="#164A40" stroke-width="1.2">
                <path d="M 120,100 Q 200,80 280,120 T 260,240 T 160,260 T 100,160 Z" />
                <path d="M 280,240 Q 300,280 290,320 T 260,380 T 240,280 Z" />
                <path d="M 450,90 Q 520,80 560,110 T 540,180 T 460,160 Z" />
                <path d="M 460,180 Q 550,170 580,250 T 540,360 T 480,340 T 440,230 Z" />
                <path d="M 560,100 Q 750,70 850,140 T 820,260 T 640,240 T 560,160 Z" />
                <path d="M 780,320 Q 860,310 880,370 T 800,410 T 760,350 Z" />
              </g>

              <!-- Grid Overlay Lines -->
              <g stroke="#ffffff" stroke-width="0.3" stroke-dasharray="3 6" opacity="0.12">
                <line x1="0" y1="250" x2="1000" y2="250" />
                <line x1="500" y1="0" x2="500" y2="500" />
                <line x1="250" y1="0" x2="250" y2="500" />
                <line x1="750" y1="0" x2="750" y2="500" />
              </g>

              <!-- Dynamic Radiating Connection Curves from Najaf HQ to Cities -->
              <!-- Najaf (610, 205) to London (480, 120) -->
              <path
                d="M 610,205 Q 545,140 480,120"
                fill="none"
                :stroke="selectedIndex === 1 ? '#E5C483' : '#C5A059'"
                :stroke-width="selectedIndex === 1 ? '3' : '1.5'"
                :stroke-dasharray="selectedIndex === 1 ? 'none' : '5 4'"
                :opacity="selectedIndex === 1 ? '1' : '0.4'"
                class="transition-all duration-500"
              />

              <!-- Najaf (610, 205) to New York (260, 160) -->
              <path
                d="M 610,205 Q 435,120 260,160"
                fill="none"
                :stroke="selectedIndex === 2 ? '#E5C483' : '#C5A059'"
                :stroke-width="selectedIndex === 2 ? '3' : '1.5'"
                :stroke-dasharray="selectedIndex === 2 ? 'none' : '5 4'"
                :opacity="selectedIndex === 2 ? '1' : '0.4'"
                class="transition-all duration-500"
              />

              <!-- Najaf (610, 205) to Beirut (580, 190) -->
              <path
                d="M 610,205 Q 595,195 580,190"
                fill="none"
                :stroke="selectedIndex === 3 ? '#E5C483' : '#C5A059'"
                :stroke-width="selectedIndex === 3 ? '3' : '1.5'"
                :stroke-dasharray="selectedIndex === 3 ? 'none' : '5 4'"
                :opacity="selectedIndex === 3 ? '1' : '0.4'"
                class="transition-all duration-500"
              />

              <!-- Najaf (610, 205) to Islamabad (690, 200) -->
              <path
                d="M 610,205 Q 650,200 690,200"
                fill="none"
                :stroke="selectedIndex === 4 ? '#E5C483' : '#C5A059'"
                :stroke-width="selectedIndex === 4 ? '3' : '1.5'"
                :stroke-dasharray="selectedIndex === 4 ? 'none' : '5 4'"
                :opacity="selectedIndex === 4 ? '1' : '0.4'"
                class="transition-all duration-500"
              />

              <!-- Najaf (610, 205) to Dar es Salaam (580, 310) -->
              <path
                d="M 610,205 Q 600,260 580,310"
                fill="none"
                :stroke="selectedIndex === 5 ? '#E5C483' : '#C5A059'"
                :stroke-width="selectedIndex === 5 ? '3' : '1.5'"
                :stroke-dasharray="selectedIndex === 5 ? 'none' : '5 4'"
                :opacity="selectedIndex === 5 ? '1' : '0.4'"
                class="transition-all duration-500"
              />
            </svg>

            <!-- Map Interactive Pins Overlay -->
            
            <!-- Pin 0: Najaf (HQ) -->
            <button
              @click="selectLocation(0)"
              :class="[
                'absolute top-[41%] left-[61%] -translate-x-1/2 -translate-y-1/2 group/pin cursor-pointer transition-all duration-300 focus:outline-none',
                selectedIndex === 0 ? 'scale-125 z-40' : 'scale-100 z-30 opacity-80 hover:opacity-100'
              ]"
            >
              <div class="relative flex items-center justify-center">
                <span class="animate-ping absolute inline-flex h-9 w-9 rounded-full bg-[#C5A059] opacity-75"></span>
                <span class="relative inline-flex rounded-full h-5 w-5 bg-gradient-to-r from-[#E5C483] to-[#C5A059] border-2 border-white shadow-xl flex items-center justify-center">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#061916]"></span>
                </span>
              </div>
              <div
                :class="[
                  'absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#061916] text-[#E5C483] text-[11px] font-extrabold px-3 py-1 rounded-lg border border-[#C5A059] whitespace-nowrap shadow-2xl items-center gap-1.5 transition-all',
                  selectedIndex === 0 ? 'flex' : 'hidden group-hover/pin:flex'
                ]"
              >
                <v-icon size="12" color="#C5A059">mdi-crown</v-icon>
                <span>{{ isRtl ? 'النجف الأشرف (المقر الرئيسي)' : 'Najaf, Iraq (Global HQ)' }}</span>
              </div>
            </button>

            <!-- Pin 1: London (UK) -->
            <button
              @click="selectLocation(1)"
              :class="[
                'absolute top-[24%] left-[48%] -translate-x-1/2 -translate-y-1/2 group/pin cursor-pointer transition-all duration-300 focus:outline-none',
                selectedIndex === 1 ? 'scale-130 z-40' : 'scale-100 z-20 opacity-80 hover:opacity-100'
              ]"
            >
              <div class="relative flex items-center justify-center">
                <span :class="['animate-ping absolute inline-flex rounded-full bg-emerald-400', selectedIndex === 1 ? 'h-8 w-8 opacity-75' : 'h-5 w-5 opacity-40']"></span>
                <span :class="['relative inline-flex rounded-full border-2 border-white shadow-md', selectedIndex === 1 ? 'h-4 w-4 bg-[#E5C483]' : 'h-3.5 w-3.5 bg-emerald-400']"></span>
              </div>
              <div
                :class="[
                  'absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#061916] text-white text-[10px] font-bold px-2.5 py-1 rounded-md border border-[#C5A059] whitespace-nowrap shadow-xl items-center gap-1 transition-all',
                  selectedIndex === 1 ? 'flex text-[#E5C483]' : 'hidden group-hover/pin:flex'
                ]"
              >
                <span>London, UK (Secretariat)</span>
              </div>
            </button>

            <!-- Pin 2: New York (USA) -->
            <button
              @click="selectLocation(2)"
              :class="[
                'absolute top-[32%] left-[26%] -translate-x-1/2 -translate-y-1/2 group/pin cursor-pointer transition-all duration-300 focus:outline-none',
                selectedIndex === 2 ? 'scale-130 z-40' : 'scale-100 z-20 opacity-80 hover:opacity-100'
              ]"
            >
              <div class="relative flex items-center justify-center">
                <span :class="['animate-ping absolute inline-flex rounded-full bg-emerald-400', selectedIndex === 2 ? 'h-8 w-8 opacity-75' : 'h-5 w-5 opacity-40']"></span>
                <span :class="['relative inline-flex rounded-full border-2 border-white shadow-md', selectedIndex === 2 ? 'h-4 w-4 bg-[#E5C483]' : 'h-3.5 w-3.5 bg-emerald-400']"></span>
              </div>
              <div
                :class="[
                  'absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#061916] text-white text-[10px] font-bold px-2.5 py-1 rounded-md border border-[#C5A059] whitespace-nowrap shadow-xl items-center gap-1 transition-all',
                  selectedIndex === 2 ? 'flex text-[#E5C483]' : 'hidden group-hover/pin:flex'
                ]"
              >
                <span>New York, USA (UN & Center)</span>
              </div>
            </button>

            <!-- Pin 3: Beirut (Lebanon) -->
            <button
              @click="selectLocation(3)"
              :class="[
                'absolute top-[38%] left-[58%] -translate-x-1/2 -translate-y-1/2 group/pin cursor-pointer transition-all duration-300 focus:outline-none',
                selectedIndex === 3 ? 'scale-130 z-40' : 'scale-100 z-20 opacity-80 hover:opacity-100'
              ]"
            >
              <div class="relative flex items-center justify-center">
                <span :class="['animate-ping absolute inline-flex rounded-full bg-emerald-400', selectedIndex === 3 ? 'h-8 w-8 opacity-75' : 'h-5 w-5 opacity-40']"></span>
                <span :class="['relative inline-flex rounded-full border-2 border-white shadow-md', selectedIndex === 3 ? 'h-4 w-4 bg-[#E5C483]' : 'h-3 w-3 bg-emerald-400']"></span>
              </div>
              <div
                :class="[
                  'absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#061916] text-white text-[10px] font-bold px-2.5 py-1 rounded-md border border-[#C5A059] whitespace-nowrap shadow-xl items-center gap-1 transition-all',
                  selectedIndex === 3 ? 'flex text-[#E5C483]' : 'hidden group-hover/pin:flex'
                ]"
              >
                <span>Beirut, Lebanon</span>
              </div>
            </button>

            <!-- Pin 4: Islamabad (Pakistan) -->
            <button
              @click="selectLocation(4)"
              :class="[
                'absolute top-[40%] left-[69%] -translate-x-1/2 -translate-y-1/2 group/pin cursor-pointer transition-all duration-300 focus:outline-none',
                selectedIndex === 4 ? 'scale-130 z-40' : 'scale-100 z-20 opacity-80 hover:opacity-100'
              ]"
            >
              <div class="relative flex items-center justify-center">
                <span :class="['animate-ping absolute inline-flex rounded-full bg-emerald-400', selectedIndex === 4 ? 'h-8 w-8 opacity-75' : 'h-5 w-5 opacity-40']"></span>
                <span :class="['relative inline-flex rounded-full border-2 border-white shadow-md', selectedIndex === 4 ? 'h-4 w-4 bg-[#E5C483]' : 'h-3 w-3 bg-emerald-400']"></span>
              </div>
              <div
                :class="[
                  'absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#061916] text-white text-[10px] font-bold px-2.5 py-1 rounded-md border border-[#C5A059] whitespace-nowrap shadow-xl items-center gap-1 transition-all',
                  selectedIndex === 4 ? 'flex text-[#E5C483]' : 'hidden group-hover/pin:flex'
                ]"
              >
                <span>Islamabad, Pakistan</span>
              </div>
            </button>

            <!-- Pin 5: Dar es Salaam (Tanzania) -->
            <button
              @click="selectLocation(5)"
              :class="[
                'absolute top-[62%] left-[58%] -translate-x-1/2 -translate-y-1/2 group/pin cursor-pointer transition-all duration-300 focus:outline-none',
                selectedIndex === 5 ? 'scale-130 z-40' : 'scale-100 z-20 opacity-80 hover:opacity-100'
              ]"
            >
              <div class="relative flex items-center justify-center">
                <span :class="['animate-ping absolute inline-flex rounded-full bg-emerald-400', selectedIndex === 5 ? 'h-8 w-8 opacity-75' : 'h-5 w-5 opacity-40']"></span>
                <span :class="['relative inline-flex rounded-full border-2 border-white shadow-md', selectedIndex === 5 ? 'h-4 w-4 bg-[#E5C483]' : 'h-3 w-3 bg-emerald-400']"></span>
              </div>
              <div
                :class="[
                  'absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#061916] text-white text-[10px] font-bold px-2.5 py-1 rounded-md border border-[#C5A059] whitespace-nowrap shadow-xl items-center gap-1 transition-all',
                  selectedIndex === 5 ? 'flex text-[#E5C483]' : 'hidden group-hover/pin:flex'
                ]"
              >
                <span>Dar es Salaam, Tanzania</span>
              </div>
            </button>

          </div>

          <!-- Bottom City Quick Selector Bar -->
          <div class="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              v-for="(loc, idx) in locations"
              :key="loc.city"
              @click="selectLocation(idx)"
              :class="[
                'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap border cursor-pointer',
                selectedIndex === idx
                  ? 'bg-gradient-to-r from-[#E5C483] via-[#C5A059] to-[#8C6B28] text-[#061916] border-white/40 shadow-lg scale-105'
                  : 'bg-[#041210] text-gray-300 border-white/10 hover:border-[#C5A059]/40 hover:text-white'
              ]"
            >
              <v-icon size="14">{{ loc.isHq ? 'mdi-crown' : 'mdi-map-marker' }}</v-icon>
              <span>{{ loc.city }}</span>
            </button>
          </div>

        </div>

        <!-- Right Side: Stats & Featured Institutions (Span 4) -->
        <div class="lg:col-span-4 flex flex-col justify-between gap-6">
          
          <!-- Key Metrics Grid -->
          <div class="grid grid-cols-1 gap-4">
            <div class="bg-[#061916]/90 border border-[#C5A059]/30 rounded-2xl p-5 flex items-center justify-between shadow-xl backdrop-blur-md hover:border-[#C5A059] transition-all">
              <div>
                <span class="block text-3xl sm:text-4xl font-extrabold font-mono text-[#E5C483]">30+</span>
                <span class="text-xs font-bold text-gray-300 uppercase tracking-wider">{{ t('presence.countries') }}</span>
              </div>
              <div class="w-12 h-12 rounded-2xl bg-[#C5A059]/15 border border-[#C5A059]/40 flex items-center justify-center text-[#E5C483]">
                <v-icon size="24">mdi-earth</v-icon>
              </div>
            </div>

            <div class="bg-[#061916]/90 border border-[#C5A059]/30 rounded-2xl p-5 flex items-center justify-between shadow-xl backdrop-blur-md hover:border-[#C5A059] transition-all">
              <div>
                <span class="block text-3xl sm:text-4xl font-extrabold font-mono text-[#E5C483]">100+</span>
                <span class="text-xs font-bold text-gray-300 uppercase tracking-wider">{{ t('presence.institutions') }}</span>
              </div>
              <div class="w-12 h-12 rounded-2xl bg-[#C5A059]/15 border border-[#C5A059]/40 flex items-center justify-center text-[#E5C483]">
                <v-icon size="24">mdi-domain</v-icon>
              </div>
            </div>

            <div class="bg-[#061916]/90 border border-[#C5A059]/30 rounded-2xl p-5 flex items-center justify-between shadow-xl backdrop-blur-md hover:border-[#C5A059] transition-all">
              <div>
                <span class="block text-3xl sm:text-4xl font-extrabold font-mono text-[#E5C483]">1M+</span>
                <span class="text-xs font-bold text-gray-300 uppercase tracking-wider">{{ t('presence.beneficiaries') }}</span>
              </div>
              <div class="w-12 h-12 rounded-2xl bg-[#C5A059]/15 border border-[#C5A059]/40 flex items-center justify-center text-[#E5C483]">
                <v-icon size="24">mdi-account-group-outline</v-icon>
              </div>
            </div>
          </div>

          <!-- Featured Institutions Box -->
          <div class="bg-[#061916]/90 border border-[#C5A059]/30 rounded-2xl p-5 space-y-4 shadow-xl backdrop-blur-md flex-1 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
                <h3 class="text-sm font-bold font-serif text-[#E5C483] uppercase tracking-wider">
                  {{ isRtl ? 'أبرز المؤسسات والمراكز' : 'Featured Centers' }}
                </h3>
                <v-icon size="18" color="#C5A059">mdi-bank-outline</v-icon>
              </div>

              <div class="space-y-2.5">
                <div
                  v-for="inst in featuredList"
                  :key="inst.name"
                  class="flex items-center justify-between p-3 bg-[#041210] border border-white/10 rounded-xl hover:border-[#C5A059]/50 transition-all cursor-pointer group"
                >
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-[#C5A059]/15 text-[#E5C483] flex items-center justify-center">
                      <v-icon size="16">{{ inst.icon }}</v-icon>
                    </div>
                    <div>
                      <h4 class="text-xs font-bold text-white group-hover:text-[#E5C483] transition-colors">{{ inst.name }}</h4>
                      <p class="text-[10px] text-gray-400">{{ inst.location }}</p>
                    </div>
                  </div>
                  <v-icon size="14" class="text-gray-500 group-hover:text-[#E5C483] transition-all">{{ isRtl ? 'mdi-chevron-left' : 'mdi-chevron-right' }}</v-icon>
                </div>
              </div>
            </div>

            <a
              href="#"
              @click.prevent="$emit('view-institutions')"
              class="w-full py-2.5 bg-white/5 border border-[#C5A059]/40 hover:bg-[#C5A059] hover:text-[#061916] text-[#E5C483] font-bold text-xs rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 transition-all mt-2"
            >
              <span>{{ t('presence.viewAllInstitutions') }}</span>
              <v-icon size="16">{{ isRtl ? 'mdi-arrow-left' : 'mdi-arrow-right' }}</v-icon>
            </a>
          </div>

        </div>

      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCmsStore } from '@/stores/cms'

defineEmits(['view-institutions', 'view-locations'])

const { t, locale } = useI18n()
const cms = useCmsStore()

const isRtl = computed(() => locale.value === 'ar')

const selectedIndex = ref(0)

const locations = computed(() => [
  {
    city: isRtl.value ? 'النجف الأشرف' : 'Najaf HQ',
    country: isRtl.value ? 'العراق' : 'Iraq',
    type: isRtl.value ? 'المقر الرئيسي والحوزة العلمية' : 'Global Headquarters & Seminary',
    isHq: true,
  },
  {
    city: 'London',
    country: 'UK',
    type: isRtl.value ? 'الأمانة العامة والمركز الرئيسي' : 'Global Secretariat & Center',
    isHq: false,
  },
  {
    city: 'New York',
    country: 'USA',
    type: isRtl.value ? 'المركز الإسلامي ووفد الأمم المتحدة' : 'Islamic Center & UN Delegation',
    isHq: false,
  },
  {
    city: 'Beirut',
    country: 'Lebanon',
    type: isRtl.value ? 'الفرع الثقافي والأكاديمي' : 'Cultural & Academic Branch',
    isHq: false,
  },
  {
    city: 'Islamabad',
    country: 'Pakistan',
    type: isRtl.value ? 'الرعاية التعليمية وإغاثة الأيتام' : 'Educational & Orphan Relief Mission',
    isHq: false,
  },
  {
    city: 'Dar es Salaam',
    country: 'Tanzania',
    type: isRtl.value ? 'المساعدات والإغاثة الإنسانية' : 'Humanitarian & Aid Mission',
    isHq: false,
  },
])

const activeLocation = computed(() => locations.value[selectedIndex.value])

function selectLocation(idx: number) {
  selectedIndex.value = idx
}

const featuredList = computed(() => {
  return cms.institutions.map(inst => ({
    name: isRtl.value ? inst.nameAr : inst.nameEn,
    location: isRtl.value ? inst.locationAr : inst.locationEn,
    icon: inst.icon || 'mdi-school-outline',
  }))
})
</script>

<style scoped>
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
.scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
