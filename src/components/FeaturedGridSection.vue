<template>
  <section class="py-16 bg-[#08221E] border-t border-[#C5A059]/20 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">

        <!-- Card 1: Your Donation Makes a Difference (Span 5) -->
        <div class="lg:col-span-5 bg-gradient-to-br from-[#0A2924] via-[#0A2924] to-[#133E37] border border-[#C5A059]/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-[#C5A059]/60 transition-all duration-300">
          <div class="absolute -right-12 -bottom-12 w-48 h-48 bg-[#C5A059]/5 rounded-full blur-2xl group-hover:bg-[#C5A059]/10 transition-all"></div>

          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/30 text-[#E5C483] text-[11px] font-bold uppercase tracking-wider mb-4">
              <v-icon size="14">mdi-heart</v-icon>
              <span>Humanitarian Cause</span>
            </div>

            <h3 class="text-2xl font-bold font-serif text-white mb-3">
              {{ t('featured.donationTitle') }}
            </h3>

            <p class="text-xs text-gray-300 font-light leading-relaxed mb-6">
              {{ t('featured.donationDesc') }}
            </p>

            <!-- Donation Progress Bar -->
            <div class="space-y-2 mb-6">
              <div class="flex justify-between text-xs font-semibold">
                <span class="text-[#E5C483] font-mono">$1,250,000</span>
                <span class="text-gray-400">Goal: $2,000,000 (62%)</span>
              </div>

              <div class="w-full h-2.5 bg-[#061916] rounded-full overflow-hidden p-0.5 border border-[#C5A059]/20">
                <div class="h-full bg-gradient-to-r from-[#C5A059] to-[#E5C483] rounded-full w-[62%] transition-all duration-1000 shadow-sm"></div>
              </div>
            </div>
          </div>

          <v-btn
            color="#C5A059"
            size="large"
            elevation="4"
            class="text-xs font-bold tracking-wider py-3 text-[#061916] hover:bg-[#E5C483] transition-all rounded-xl"
            @click="$emit('open-donate')"
          >
            <v-icon start size="16">mdi-heart</v-icon>
            {{ t('featured.donateNow') }}
          </v-btn>
        </div>

        <!-- Card 2: Live Broadcast (Span 4) -->
        <div class="lg:col-span-4 bg-[#0A2924] border border-[#C5A059]/30 rounded-2xl overflow-hidden flex flex-col justify-between shadow-xl relative group hover:border-[#C5A059]/60 transition-all duration-300">
          
          <!-- Image & Live Badge -->
          <div class="relative h-48 sm:h-52 overflow-hidden">
            <img
              src="@/assets/card_image.jpg"
              alt="Live Broadcast"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-[#0A2924] via-transparent to-black/40"></div>

            <div class="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/90 text-white text-[10px] font-extrabold tracking-widest uppercase shadow-md animate-pulse">
              <span class="w-1.5 h-1.5 rounded-full bg-white"></span>
              <span>{{ t('featured.liveBadge') }}</span>
            </div>

            <div class="absolute bottom-3 left-3 right-3 text-white">
              <span class="text-[10px] font-bold text-[#C5A059] uppercase tracking-widest">{{ t('featured.liveTitle') }}</span>
              <h4 class="text-sm font-bold font-serif leading-snug">{{ t('featured.liveLectureTitle') }}</h4>
            </div>
          </div>

          <!-- Content & Action -->
          <div class="p-6 flex-1 flex flex-col justify-between">
            <p class="text-xs text-gray-300 font-light leading-relaxed mb-4">
              Watch live streaming lectures, majalis, and Q&A sessions directly from the Holy City of Najaf.
            </p>

            <v-btn
              variant="outlined"
              color="#C5A059"
              size="large"
              class="text-xs font-bold tracking-wider py-3 border-[#C5A059]/40 hover:bg-[#C5A059] hover:text-[#061916] transition-all rounded-xl text-white"
              @click="$emit('open-live')"
            >
              <v-icon start size="16">mdi-play-circle-outline</v-icon>
              {{ t('featured.watchLive') }}
            </v-btn>
          </div>
        </div>

        <!-- Card 3: Ask a Religious Question (Span 3) -->
        <div class="lg:col-span-3 bg-gradient-to-b from-[#133E37]/80 to-[#0A2924] border border-[#C5A059]/30 rounded-2xl p-6 flex flex-col justify-between shadow-xl relative group hover:border-[#C5A059]/60 transition-all duration-300">
          <div>
            <div class="w-12 h-12 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] mb-4">
              <v-icon size="24">mdi-head-question-outline</v-icon>
            </div>

            <h3 class="text-lg font-bold font-serif text-white mb-2">
              {{ t('featured.askTitle') }}
            </h3>

            <p class="text-xs text-gray-300 font-light leading-relaxed mb-4">
              {{ t('featured.askDesc') }}
            </p>
          </div>

          <v-btn
            color="#1A4D45"
            size="large"
            class="text-xs font-bold tracking-wider py-3 text-white hover:bg-[#C5A059] hover:text-[#061916] border border-[#C5A059]/30 transition-all rounded-xl"
            @click="$emit('open-ask')"
          >
            {{ t('featured.askBtn') }}
            <v-icon end size="16">mdi-help-circle-outline</v-icon>
          </v-btn>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineEmits(['open-donate', 'open-live', 'open-ask'])

const { t } = useI18n()
</script>
