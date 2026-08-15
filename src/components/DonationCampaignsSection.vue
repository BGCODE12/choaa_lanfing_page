<template>
  <section class="py-20 bg-[#041210] relative overflow-hidden border-t border-b border-[#C5A059]/20">
    
    <!-- Radiant Background Atmospheric Glows -->
    <div class="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-[#0A2924]/60 rounded-full blur-2xl pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div class="space-y-3 max-w-2xl text-left" :class="{ 'text-right': isRtl }">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#061916] border border-[#C5A059]/40 text-[#E5C483] text-xs font-semibold uppercase tracking-wider shadow-md">
            <v-icon size="16" color="#C5A059">mdi-hand-heart-outline</v-icon>
            <span>{{ isRtl ? 'أبواب التبرع والمشاريع الإنسانية' : 'DONATION CAMPAIGNS & RELIEF' }}</span>
          </div>

          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-white tracking-tight">
            {{ isRtl ? 'ساهم في صناعة الأثر وإغاثة المحتاجين' : 'Support Our Humanitarian Appeals' }}
          </h2>

          <p class="text-sm sm:text-base text-gray-300 font-light leading-relaxed">
            {{ isRtl ? 'اختر نوع التبرع الذي ترغب بدعمه ليصل أثر عطائك مباشرة إلى مستحقيه حول العالم برعاية وإشراف مباشر.' : 'Choose a cause to support and make an immediate, lasting impact on communities and families worldwide.' }}
          </p>
        </div>

        <!-- Carousel Navigation Controls (Desktop & Tablet) -->
        <div class="flex items-center gap-3 self-end">
          <button
            @click="prevSlide"
            class="w-12 h-12 rounded-full bg-[#061916] border border-[#C5A059]/40 text-[#E5C483] hover:bg-[#C5A059] hover:text-[#061916] transition-all flex items-center justify-center shadow-lg active:scale-95 cursor-pointer"
            :title="isRtl ? 'السابق' : 'Previous'"
            aria-label="Previous Campaign"
          >
            <v-icon size="22">{{ isRtl ? 'mdi-chevron-right' : 'mdi-chevron-left' }}</v-icon>
          </button>

          <button
            @click="nextSlide"
            class="w-12 h-12 rounded-full bg-[#061916] border border-[#C5A059]/40 text-[#E5C483] hover:bg-[#C5A059] hover:text-[#061916] transition-all flex items-center justify-center shadow-lg active:scale-95 cursor-pointer"
            :title="isRtl ? 'التالي' : 'Next'"
            aria-label="Next Campaign"
          >
            <v-icon size="22">{{ isRtl ? 'mdi-chevron-left' : 'mdi-chevron-right' }}</v-icon>
          </button>
        </div>
      </div>

      <!-- Carousel Cards Grid / Slider Window -->
      <div class="overflow-hidden py-2 -mx-2 px-2">
        <div
          class="flex transition-transform duration-500 ease-out gap-6"
          :style="{ transform: `translateX(${carouselOffset}%)` }"
        >
          <div
            v-for="campaign in campaigns"
            :key="campaign.id"
            class="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex-shrink-0"
          >
            <!-- Card Container -->
            <div class="h-full bg-gradient-to-b from-[#061916] to-[#041210] border border-[#C5A059]/30 hover:border-[#C5A059] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#C5A059]/10 transition-all duration-300 flex flex-col group/card">
              
              <!-- Card Image Box -->
              <div class="relative h-56 w-full overflow-hidden bg-black">
                <img
                  :src="campaign.image || defaultHeroImg"
                  :alt="campaign.title"
                  class="w-full h-full object-cover object-center group-hover/card:scale-105 transition-transform duration-700 filter brightness-95"
                />

                <!-- Category Tag Overlay -->
                <div class="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-[#061916]/85 backdrop-blur-md border border-[#C5A059]/50 text-[#E5C483] font-mono text-[10px] font-bold uppercase tracking-wider shadow-lg">
                  {{ campaign.category }}
                </div>

                <!-- Gradient Overlay for Image Softness -->
                <div class="absolute inset-0 bg-gradient-to-t from-[#061916] via-transparent to-transparent"></div>
              </div>

              <!-- Card Content Body -->
              <div class="p-6 flex-1 flex flex-col justify-between space-y-5">
                
                <div class="space-y-3 text-left" :class="{ 'text-right': isRtl }">
                  <!-- Title -->
                  <h3 class="text-xl font-bold font-serif text-white tracking-wide group-hover/card:text-[#E5C483] transition-colors leading-snug">
                    {{ campaign.title }}
                  </h3>

                  <!-- Caption / Description -->
                  <p class="text-xs sm:text-sm text-gray-300 font-light leading-relaxed line-clamp-3">
                    {{ campaign.caption }}
                  </p>
                </div>

                <!-- Goal / Raised Progress (If Configured) -->
                <div v-if="campaign.raisedAmount && campaign.targetAmount" class="space-y-1.5 pt-2 border-t border-white/10">
                  <div class="flex justify-between text-[11px] font-mono text-gray-400">
                    <span>{{ isRtl ? 'تم جمع:' : 'Raised:' }} <strong class="text-[#E5C483]">{{ campaign.raisedAmount }}</strong></span>
                    <span>{{ isRtl ? 'الهدف:' : 'Goal:' }} {{ campaign.targetAmount }}</span>
                  </div>
                  <div class="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-[#C5A059] to-[#E5C483] rounded-full w-3/4"></div>
                  </div>
                </div>

                <!-- Centered 'Donate Now' CTA Button -->
                <div class="pt-3 flex justify-center">
                  <button
                    @click="onDonateClick(campaign)"
                    class="w-full py-3.5 px-6 bg-gradient-to-r from-[#E5C483] via-[#C5A059] to-[#8C6B28] text-[#061916] font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-xl hover:brightness-110 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-black/40"
                  >
                    <v-icon size="18">mdi-heart</v-icon>
                    <span>{{ isRtl ? 'تبرع الآن' : 'DONATE NOW' }}</span>
                  </button>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>

      <!-- Pagination Indicators & Counter -->
      <div class="mt-8 flex items-center justify-center gap-3">
        <button
          v-for="(_, index) in Math.max(1, campaigns.length - visibleCardsCount + 1)"
          :key="index"
          @click="currentIndex = index"
          :class="[
            'h-2 rounded-full transition-all duration-300 cursor-pointer',
            currentIndex === index ? 'w-8 bg-[#C5A059]' : 'w-2.5 bg-white/30 hover:bg-white/60'
          ]"
          :title="`Page ${index + 1}`"
        ></button>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCmsStore, type DonationCampaign } from '@/stores/cms'
import defaultHeroImg from '@/assets/card_image.jpg'

const emit = defineEmits(['open-donate', 'select-campaign'])

const { locale } = useI18n()
const cms = useCmsStore()

const isRtl = computed(() => locale.value === 'ar')
const currentIndex = ref(0)
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1200)

function handleResize() {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const visibleCardsCount = computed(() => {
  if (windowWidth.value < 640) return 1
  if (windowWidth.value < 1024) return 2
  return 3
})

const campaigns = computed(() => {
  return cms.donationCampaigns.map(c => ({
    id: c.id,
    title: isRtl.value ? c.titleAr : c.titleEn,
    category: isRtl.value ? c.categoryAr : c.categoryEn,
    caption: isRtl.value ? c.captionAr : c.captionEn,
    image: c.image || defaultHeroImg,
    targetAmount: c.targetAmount,
    raisedAmount: c.raisedAmount,
    customDonateUrl: c.customDonateUrl,
  }))
})

const maxIndex = computed(() => {
  return Math.max(0, campaigns.value.length - visibleCardsCount.value)
})

const carouselOffset = computed(() => {
  const step = 100 / visibleCardsCount.value
  const factor = isRtl.value ? 1 : -1
  return factor * (currentIndex.value * step)
})

function nextSlide() {
  if (currentIndex.value < maxIndex.value) {
    currentIndex.value++
  } else {
    currentIndex.value = 0
  }
}

function prevSlide() {
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = maxIndex.value
  }
}

function onDonateClick(campaign: any) {
  if (campaign.customDonateUrl && (campaign.customDonateUrl.startsWith('http://') || campaign.customDonateUrl.startsWith('https://'))) {
    window.open(campaign.customDonateUrl, '_blank')
  } else {
    emit('open-donate', campaign)
  }
}
</script>
