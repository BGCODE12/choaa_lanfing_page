<template>
  <section class="py-16 bg-gray-50 border-t border-b border-gray-200 text-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">

        <!-- Card 1: Your Donation Makes a Difference (Dark Accent Card) -->
        <div class="lg:col-span-5 bg-[#061916] text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group">
          <div class="absolute -right-12 -bottom-12 w-48 h-48 bg-[#C5A059]/10 rounded-full blur-2xl"></div>

          <div>
            <h3 class="text-2xl font-bold font-serif text-white mb-2">
              {{ t('featured.donationTitle') }}
            </h3>

            <p class="text-xs text-gray-300 font-light leading-relaxed mb-6">
              {{ t('featured.donationDesc') }}
            </p>

            <div class="text-xs font-semibold text-[#E5C483] font-mono mb-2">
              $1,250,000 raised of $2,000,000 goal
            </div>

            <!-- Donation Progress Bar -->
            <div class="w-full h-2 bg-[#133E37] rounded-full overflow-hidden mb-6">
              <div class="h-full bg-[#C5A059] rounded-full w-[62%]"></div>
            </div>
          </div>

          <button
            @click="$emit('open-donate')"
            class="w-fit px-6 py-2.5 bg-[#C5A059] text-[#061916] text-xs font-bold rounded-lg hover:bg-[#E5C483] transition-all uppercase tracking-wider flex items-center gap-1.5"
          >
            <span>{{ t('featured.donateNow') }}</span>
            <v-icon size="14">mdi-heart</v-icon>
          </button>
        </div>

        <!-- Card 2: Live Broadcast (Dark Live Card) -->
        <div class="lg:col-span-4 bg-[#061916] text-white rounded-2xl overflow-hidden flex flex-col justify-between shadow-xl relative group">
          <div class="relative h-44 overflow-hidden">
            <img
              src="@/assets/card_image.jpg"
              alt="Live Broadcast"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-[#061916] via-transparent to-black/30"></div>

            <div class="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[9px] font-bold uppercase tracking-wider">
              <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              <span>LIVE</span>
            </div>
          </div>

          <div class="p-6 flex-1 flex flex-col justify-between">
            <div>
              <span class="text-[10px] font-bold text-[#C5A059] uppercase tracking-widest block mb-1">LIVE BROADCAST</span>
              <h4 class="text-base font-bold font-serif text-white mb-4">Daily Lectures from Najaf, Iraq</h4>
            </div>

            <button
              @click="$emit('open-live')"
              class="w-fit px-5 py-2 border border-white/30 text-white text-xs font-bold rounded-lg hover:bg-white hover:text-[#061916] transition-all uppercase tracking-wider flex items-center gap-1.5"
            >
              <span>{{ t('featured.watchLive') }}</span>
              <v-icon size="14">mdi-play-circle-outline</v-icon>
            </button>
          </div>
        </div>

        <!-- Card 3: Ask a Religious Question (Light Card) -->
        <div class="lg:col-span-3 bg-white border border-gray-200 rounded-2xl p-6 flex flex-col justify-between shadow-md group">
          <div>
            <h3 class="text-base font-bold font-serif text-gray-900 mb-2 uppercase tracking-wide">
              {{ t('featured.askTitle') }}
            </h3>

            <p class="text-xs text-gray-500 font-normal leading-relaxed mb-4">
              {{ t('featured.askDesc') }}
            </p>
          </div>

          <button
            @click="$emit('open-ask')"
            class="w-full py-2.5 bg-[#0A2924] text-white text-xs font-bold rounded-lg hover:bg-[#133E37] transition-all uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <span>{{ t('featured.askBtn') }}</span>
            <v-icon size="16">mdi-help-circle-outline</v-icon>
          </button>
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
