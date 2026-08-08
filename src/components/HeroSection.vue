<template>
  <section
    class="relative min-h-[580px] lg:min-h-[660px] flex items-center justify-center overflow-hidden bg-[#061916] group"
    @mouseenter="pauseAutoplay"
    @mouseleave="startAutoplay"
  >
    <!-- Background Image & Enhanced Glowing Overlay -->
    <div class="absolute inset-0 z-0">
      <img
        :src="currentSlide.bgImage || defaultHeroImg"
        alt="Najaf Shrine Background"
        class="w-full h-full object-cover object-center filter brightness-[0.58] contrast-115 transition-all duration-1000 scale-105 group-hover:scale-100"
      />
      <!-- Gradient Overlays to preserve high text contrast while keeping image vibrant & clear -->
      <div class="absolute inset-0 bg-gradient-to-t from-[#061916] via-[#061916]/40 to-transparent"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-[#061916]/90 via-[#061916]/50 to-transparent" :class="{ 'bg-gradient-to-l': isRtl }"></div>
    </div>

    <!-- Main Content Container with Vue Transition -->
    <div class="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col justify-between min-h-[480px]">
      
      <div class="max-w-4xl space-y-6 text-left" :class="{ 'text-right': isRtl }">
        <Transition name="hero-fade" mode="out-in">
          <div :key="currentSlideIndex" class="space-y-6">
            
            <!-- Badge -->
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#061916]/80 border border-[#C5A059]/40 text-[#E5C483] text-xs font-semibold uppercase tracking-wider backdrop-blur-md shadow-lg">
              <v-icon size="14" color="#C5A059">mdi-star-four-points-outline</v-icon>
              <span>{{ currentSlide.badge }}</span>
            </div>

            <!-- Title -->
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-white tracking-tight leading-tight drop-shadow-md">
              {{ currentSlide.tagline }}
              <span class="block text-transparent bg-clip-text bg-gradient-to-r from-[#E5C483] via-[#C5A059] to-[#8C6B28] mt-1">
                {{ currentSlide.subTagline }}
              </span>
            </h1>

            <!-- Description -->
            <p class="text-base sm:text-lg text-gray-200 max-w-2xl font-light leading-relaxed drop-shadow-sm">
              {{ currentSlide.description }}
            </p>

            <!-- Action Buttons with Custom Link Handler -->
            <div class="flex flex-wrap items-center gap-4 pt-3">
              <button
                @click="onButtonClick(currentSlide.primaryAction, currentSlide.primaryBtnLink)"
                class="px-8 py-3.5 bg-gradient-to-r from-[#E5C483] via-[#C5A059] to-[#8C6B28] text-[#061916] text-xs sm:text-sm font-extrabold tracking-wider rounded-lg shadow-xl shadow-black/40 hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center gap-2 uppercase cursor-pointer"
              >
                <span>{{ currentSlide.primaryBtnText }}</span>
                <v-icon size="18">{{ isRtl ? 'mdi-arrow-left' : 'mdi-arrow-right' }}</v-icon>
              </button>

              <button
                @click="onButtonClick(currentSlide.secondaryAction, currentSlide.secondaryBtnLink)"
                class="px-8 py-3.5 bg-[#061916]/70 backdrop-blur-md border border-[#C5A059]/70 text-white text-xs sm:text-sm font-bold tracking-wider rounded-lg hover:bg-[#C5A059]/30 hover:border-[#C5A059] hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center gap-2 uppercase cursor-pointer shadow-lg"
              >
                <v-icon size="18" class="text-[#E5C483]">mdi-heart-outline</v-icon>
                <span>{{ currentSlide.secondaryBtnText }}</span>
              </button>
            </div>

          </div>
        </Transition>
      </div>

      <!-- Carousel Bottom Bar (Social Links + Navigation Dots & Arrows) -->
      <div class="pt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-300">
        
        <!-- Dynamic Social Links -->
        <div class="flex items-center gap-4">
          <span>{{ t('hero.followUs') }}</span>
          <div class="flex items-center gap-2.5 text-white">
            <a :href="cms.socialLinks.facebook || '#'" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded-full bg-[#061916]/60 backdrop-blur-md border border-white/20 flex items-center justify-center hover:border-[#C5A059] hover:text-[#C5A059] transition-all" title="Facebook"><v-icon size="16">mdi-facebook</v-icon></a>
            <a :href="cms.socialLinks.youtube || '#'" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded-full bg-[#061916]/60 backdrop-blur-md border border-white/20 flex items-center justify-center hover:border-[#C5A059] hover:text-[#C5A059] transition-all" title="YouTube"><v-icon size="16">mdi-youtube</v-icon></a>
            <a :href="cms.socialLinks.instagram || '#'" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded-full bg-[#061916]/60 backdrop-blur-md border border-white/20 flex items-center justify-center hover:border-[#C5A059] hover:text-[#C5A059] transition-all" title="Instagram"><v-icon size="16">mdi-instagram</v-icon></a>
            <a :href="cms.socialLinks.twitter || '#'" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded-full bg-[#061916]/60 backdrop-blur-md border border-white/20 flex items-center justify-center hover:border-[#C5A059] hover:text-[#C5A059] transition-all" title="Twitter / X"><v-icon size="16">mdi-twitter</v-icon></a>
            <a v-if="cms.socialLinks.telegram" :href="cms.socialLinks.telegram" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded-full bg-[#061916]/60 backdrop-blur-md border border-white/20 flex items-center justify-center hover:border-[#C5A059] hover:text-[#C5A059] transition-all" title="Telegram"><v-icon size="16">mdi-paper-plane</v-icon></a>
          </div>
        </div>

        <!-- Carousel Indicators & Arrows -->
        <div class="flex items-center gap-6">
          <!-- Dots -->
          <div class="flex items-center gap-2">
            <button
              v-for="(slide, index) in slides"
              :key="slide.id"
              @click="goToSlide(index)"
              :class="[
                'h-2 rounded-full transition-all duration-300 cursor-pointer',
                currentSlideIndex === index ? 'w-8 bg-[#C5A059]' : 'w-2 bg-white/40 hover:bg-white/70'
              ]"
              :title="`Slide ${index + 1}`"
            ></button>
          </div>

          <!-- Slide Counter -->
          <span class="font-mono text-[#E5C483] font-bold text-xs">
            0{{ currentSlideIndex + 1 }} / 0{{ slides.length }}
          </span>

          <!-- Navigation Arrows -->
          <div class="flex items-center gap-2">
            <button
              @click="prevSlide"
              class="w-9 h-9 rounded-full bg-[#061916]/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:border-[#C5A059] hover:bg-[#C5A059] hover:text-[#061916] transition-all cursor-pointer"
              title="Previous Slide"
            >
              <v-icon size="18">{{ isRtl ? 'mdi-chevron-right' : 'mdi-chevron-left' }}</v-icon>
            </button>
            <button
              @click="nextSlide"
              class="w-9 h-9 rounded-full bg-[#061916]/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:border-[#C5A059] hover:bg-[#C5A059] hover:text-[#061916] transition-all cursor-pointer"
              title="Next Slide"
            >
              <v-icon size="18">{{ isRtl ? 'mdi-chevron-left' : 'mdi-chevron-right' }}</v-icon>
            </button>
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

const emit = defineEmits(['open-action', 'open-programs', 'open-donate'])

const { t, locale } = useI18n()
const cms = useCmsStore()

const isRtl = computed(() => locale.value === 'ar')

const currentSlideIndex = ref(0)
let autoplayTimer: any = null

const slides = computed(() => {
  return cms.heroSlides.map(s => ({
    id: s.id,
    badge: isRtl.value ? s.badgeAr : s.badgeEn,
    tagline: isRtl.value ? s.taglineAr : s.taglineEn,
    subTagline: isRtl.value ? s.subTaglineAr : s.subTaglineEn,
    description: isRtl.value ? s.descriptionAr : s.descriptionEn,
    primaryBtnText: isRtl.value ? s.primaryBtnAr : s.primaryBtnEn,
    secondaryBtnText: isRtl.value ? s.secondaryBtnAr : s.secondaryBtnEn,
    primaryAction: s.primaryAction,
    secondaryAction: s.secondaryAction,
    primaryBtnLink: s.primaryBtnLink,
    secondaryBtnLink: s.secondaryBtnLink,
    bgImage: s.bgImage || defaultHeroImg,
  }))
})

const currentSlide = computed(() => {
  const sList = slides.value
  if (currentSlideIndex.value >= sList.length) {
    currentSlideIndex.value = 0
  }
  return sList[currentSlideIndex.value] || sList[0]
})

function onButtonClick(action: string, customLink?: string) {
  if (customLink && customLink.startsWith('#')) {
    const targetId = customLink.substring(1)
    const el = document.getElementById(targetId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      return
    }
  } else if (customLink && (customLink.startsWith('http://') || customLink.startsWith('https://'))) {
    window.open(customLink, '_blank')
    return
  }
  emit('open-action', action, customLink)
}

function nextSlide() {
  currentSlideIndex.value = (currentSlideIndex.value + 1) % slides.value.length
}

function prevSlide() {
  currentSlideIndex.value = (currentSlideIndex.value - 1 + slides.value.length) % slides.value.length
}

function goToSlide(index: number) {
  currentSlideIndex.value = index
}

function startAutoplay() {
  if (autoplayTimer) clearInterval(autoplayTimer)
  autoplayTimer = setInterval(() => {
    nextSlide()
  }, 5500)
}

function pauseAutoplay() {
  if (autoplayTimer) clearInterval(autoplayTimer)
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  pauseAutoplay()
})
</script>

<style scoped>
.hero-fade-enter-active,
.hero-fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.hero-fade-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.hero-fade-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
