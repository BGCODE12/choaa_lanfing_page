<template>
  <section
    class="relative w-full h-[360px] sm:h-[480px] md:h-[560px] lg:h-[650px] xl:h-[720px] overflow-hidden bg-[#041210] group select-none"
    @mouseenter="pauseAutoplay"
    @mouseleave="startAutoplay"
  >
    <!-- Slides Images Container with Smooth Slide Transition -->
    <div class="relative w-full h-full">
      <TransitionGroup name="carousel-fade">
        <div
          v-for="(slide, index) in slides"
          :key="slide.id"
          v-show="currentSlideIndex === index"
          class="absolute inset-0 w-full h-full"
        >
          <img
            :src="slide.bgImage || defaultHeroImg"
            alt="Hero Carousel Slide"
            class="w-full h-full object-cover object-center filter brightness-95 contrast-105 transition-transform duration-[6000ms] ease-out scale-100 group-hover:scale-105"
          />

          <!-- Very Subtle Soft Vignette for Visual Elegance -->
          <div class="absolute inset-0 bg-gradient-to-t from-[#041210]/60 via-transparent to-[#041210]/20 pointer-events-none"></div>
        </div>
      </TransitionGroup>
    </div>

    <!-- Left & Right Floating Navigation Arrows -->
    <button
      @click="prevSlide"
      class="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#061916]/60 hover:bg-[#C5A059] text-white hover:text-[#061916] border border-[#C5A059]/40 hover:border-[#C5A059] backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-2xl opacity-75 sm:opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 z-20 cursor-pointer"
      :title="isRtl ? 'الصورة السابقة' : 'Previous Slide'"
      aria-label="Previous Slide"
    >
      <v-icon size="24">{{ isRtl ? 'mdi-chevron-right' : 'mdi-chevron-left' }}</v-icon>
    </button>

    <button
      @click="nextSlide"
      class="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#061916]/60 hover:bg-[#C5A059] text-white hover:text-[#061916] border border-[#C5A059]/40 hover:border-[#C5A059] backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-2xl opacity-75 sm:opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 z-20 cursor-pointer"
      :title="isRtl ? 'الصورة التالية' : 'Next Slide'"
      aria-label="Next Slide"
    >
      <v-icon size="24">{{ isRtl ? 'mdi-chevron-left' : 'mdi-chevron-right' }}</v-icon>
    </button>

    <!-- Sleek Bottom Pagination Indicators -->
    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 px-4 py-2 rounded-full bg-[#061916]/70 backdrop-blur-md border border-white/10 shadow-2xl">
      <button
        v-for="(slide, index) in slides"
        :key="slide.id"
        @click="goToSlide(index)"
        :class="[
          'h-2 rounded-full transition-all duration-500 cursor-pointer',
          currentSlideIndex === index
            ? 'w-8 bg-gradient-to-r from-[#E5C483] via-[#C5A059] to-[#8C6B28] shadow-md shadow-[#C5A059]/50'
            : 'w-2.5 bg-white/40 hover:bg-white/80'
        ]"
        :title="`Slide ${index + 1}`"
        :aria-label="`Go to slide ${index + 1}`"
      ></button>
    </div>

    <!-- Subtle Slide Counter Pill (Top-Right) -->
    <div class="absolute top-6 right-6 z-20 px-3 py-1 rounded-full bg-[#061916]/60 backdrop-blur-md border border-white/10 text-white font-mono text-xs font-bold shadow-lg">
      <span class="text-[#E5C483]">0{{ currentSlideIndex + 1 }}</span>
      <span class="text-gray-400 mx-1">/</span>
      <span class="text-gray-300">0{{ slides.length }}</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCmsStore } from '@/stores/cms'
import defaultHeroImg from '@/assets/card_image.jpg'

const { locale } = useI18n()
const cms = useCmsStore()

const isRtl = computed(() => locale.value === 'ar')

const currentSlideIndex = ref(0)
let autoplayTimer: any = null

const slides = computed(() => {
  if (!cms.heroSlides || cms.heroSlides.length === 0) {
    return [{ id: 1, bgImage: defaultHeroImg }]
  }
  return cms.heroSlides.map(s => ({
    id: s.id,
    bgImage: s.bgImage || defaultHeroImg,
  }))
})

function nextSlide() {
  if (slides.value.length === 0) return
  currentSlideIndex.value = (currentSlideIndex.value + 1) % slides.value.length
}

function prevSlide() {
  if (slides.value.length === 0) return
  currentSlideIndex.value = (currentSlideIndex.value - 1 + slides.value.length) % slides.value.length
}

function goToSlide(index: number) {
  currentSlideIndex.value = index
}

function startAutoplay() {
  if (autoplayTimer) clearInterval(autoplayTimer)
  autoplayTimer = setInterval(() => {
    nextSlide()
  }, 5000)
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
.carousel-fade-enter-active,
.carousel-fade-leave-active {
  transition: opacity 0.8s ease-in-out;
}

.carousel-fade-enter-from,
.carousel-fade-leave-to {
  opacity: 0;
}
</style>
