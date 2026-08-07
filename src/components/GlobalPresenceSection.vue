<template>
  <section class="py-16 bg-[#061916] text-white border-t border-[#C5A059]/20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <!-- Left: Global Map Stats & Counters (Span 7) -->
        <div class="lg:col-span-7 space-y-6">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/30 text-[#E5C483] text-[11px] font-bold uppercase tracking-widest mb-2">
              <v-icon size="14">mdi-earth</v-icon>
              <span>Global Reach</span>
            </div>
            <h2 class="text-3xl sm:text-4xl font-bold font-serif text-white tracking-tight">
              {{ t('presence.title') }}
            </h2>
            <p class="text-sm text-gray-300 font-light mt-2">
              {{ t('presence.subtitle') }}
            </p>
          </div>

          <!-- Stylized World Map Graphic Container -->
          <div class="relative w-full h-64 sm:h-72 bg-[#0A2924] border border-[#C5A059]/20 rounded-2xl overflow-hidden p-6 flex flex-col justify-between shadow-2xl group">
            
            <!-- Grid Lines overlay -->
            <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:16px_16px]"></div>

            <!-- Simulated Map Location Pins -->
            <div class="relative z-10 w-full h-full flex items-center justify-center">
              
              <!-- Location Pin: Najaf -->
              <div class="absolute top-[45%] left-[55%] group/pin cursor-pointer">
                <div class="relative flex items-center justify-center">
                  <span class="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-[#C5A059] opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#E5C483] border border-white"></span>
                </div>
                <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/pin:block bg-[#061916] text-[#E5C483] text-[10px] font-bold py-1 px-2.5 rounded border border-[#C5A059] whitespace-nowrap shadow-lg">
                  Najaf, Iraq (HQ)
                </div>
              </div>

              <!-- Location Pin: London -->
              <div class="absolute top-[30%] left-[45%] group/pin cursor-pointer">
                <div class="relative flex items-center justify-center">
                  <span class="animate-ping absolute inline-flex h-5 w-5 rounded-full bg-emerald-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-300 border border-white"></span>
                </div>
                <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/pin:block bg-[#061916] text-white text-[10px] font-bold py-1 px-2.5 rounded border border-[#C5A059] whitespace-nowrap shadow-lg">
                  London, UK
                </div>
              </div>

              <!-- Location Pin: New York -->
              <div class="absolute top-[35%] left-[25%] group/pin cursor-pointer">
                <div class="relative flex items-center justify-center">
                  <span class="animate-ping absolute inline-flex h-5 w-5 rounded-full bg-amber-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-amber-300 border border-white"></span>
                </div>
                <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/pin:block bg-[#061916] text-white text-[10px] font-bold py-1 px-2.5 rounded border border-[#C5A059] whitespace-nowrap shadow-lg">
                  New York, USA
                </div>
              </div>

              <p class="text-xs text-gray-500 font-mono text-center tracking-widest uppercase pointer-events-none">
                • LONDON • NAJAF • NEW YORK • ISLAMABAD • MUMBAI • BEIRUT •
              </p>
            </div>

            <div class="relative z-10 flex justify-between items-center text-xs text-gray-400 border-t border-[#C5A059]/20 pt-3">
              <span>UN ECOSOC Consultative Status</span>
              <span class="text-[#C5A059]">ECOSOC • UNESCO • UNHCR</span>
            </div>
          </div>

          <!-- Counter Grid -->
          <div class="grid grid-cols-3 gap-4 text-center">
            <div class="bg-[#0A2924] border border-[#C5A059]/20 rounded-xl p-4">
              <span class="block text-2xl sm:text-3xl font-extrabold font-mono text-[#E5C483]">30+</span>
              <span class="text-xs text-gray-300 font-medium uppercase tracking-wider">{{ t('presence.countries') }}</span>
            </div>
            <div class="bg-[#0A2924] border border-[#C5A059]/20 rounded-xl p-4">
              <span class="block text-2xl sm:text-3xl font-extrabold font-mono text-[#E5C483]">100+</span>
              <span class="text-xs text-gray-300 font-medium uppercase tracking-wider">{{ t('presence.institutions') }}</span>
            </div>
            <div class="bg-[#0A2924] border border-[#C5A059]/20 rounded-xl p-4">
              <span class="block text-2xl sm:text-3xl font-extrabold font-mono text-[#E5C483]">1M+</span>
              <span class="text-xs text-gray-300 font-medium uppercase tracking-wider">{{ t('presence.beneficiaries') }}</span>
            </div>
          </div>
        </div>

        <!-- Right: Featured Institutions List (Span 5) -->
        <div class="lg:col-span-5 bg-[#0A2924] border border-[#C5A059]/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div>
            <span class="text-xs font-bold text-[#C5A059] uppercase tracking-widest">{{ t('presence.featuredTitle') }}</span>
            <h3 class="text-xl font-bold font-serif text-white mt-1">{{ t('presence.featuredSubtitle') }}</h3>
          </div>

          <!-- List Items -->
          <div class="space-y-4">
            <div
              v-for="inst in institutions"
              :key="inst.name"
              class="group flex items-center justify-between p-3.5 bg-[#133E37]/60 border border-[#C5A059]/20 rounded-xl hover:border-[#C5A059] hover:bg-[#133E37] transition-all cursor-pointer"
            >
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-[#061916] border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-[#061916] transition-colors">
                  <v-icon size="20">{{ inst.icon }}</v-icon>
                </div>
                <div>
                  <h4 class="text-sm font-bold text-white group-hover:text-[#E5C483] transition-colors">{{ inst.name }}</h4>
                  <p class="text-[11px] text-gray-400">{{ inst.location }}</p>
                </div>
              </div>

              <v-icon size="18" class="text-gray-400 group-hover:text-[#C5A059] group-hover:translate-x-1 transition-all">mdi-arrow-right</v-icon>
            </div>
          </div>

          <v-btn
            block
            variant="outlined"
            color="#C5A059"
            class="text-xs font-bold tracking-wider py-3 border-[#C5A059]/40 hover:bg-[#C5A059]/15 text-white rounded-xl"
            @click="$emit('view-institutions')"
          >
            {{ t('presence.viewAllInstitutions') }}
            <v-icon end size="16">mdi-arrow-right</v-icon>
          </v-btn>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineEmits(['view-institutions', 'view-locations'])

const { t } = useI18n()

const institutions = [
  {
    name: 'Al-Khoei Islamic Seminary',
    location: 'Najaf, Iraq',
    icon: 'mdi-school-outline',
  },
  {
    name: 'Al-Khoei Primary & Secondary School',
    location: 'Najaf, Iraq',
    icon: 'mdi-book-education-outline',
  },
  {
    name: 'Al-Khoei Charitable Foundation',
    location: 'London, UK',
    icon: 'mdi-city-variant-outline',
  },
]
</script>
