<template>
  <section class="py-16 bg-white text-gray-900 border-b border-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 pb-4 border-b border-gray-200 gap-4">
        <div>
          <h2 class="text-xl sm:text-2xl font-bold font-serif tracking-wider uppercase text-gray-900">
            {{ t('news.title') }}
          </h2>
        </div>

        <a
          href="#"
          @click.prevent="$emit('view-all-news')"
          class="text-xs font-bold tracking-wider text-gray-700 hover:text-[#0A2924] uppercase flex items-center gap-1 transition-colors"
        >
          {{ t('news.viewAll') }}
          <v-icon size="16">mdi-arrow-right</v-icon>
        </a>
      </div>

      <!-- News Grid Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="item in newsItems"
          :key="item.id"
          class="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer"
        >
          <!-- Card Image & Date Badge -->
          <div class="relative h-44 overflow-hidden bg-gray-100">
            <img
              :src="item.image || newsImg1"
              :alt="item.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div class="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-gray-900 rounded-md px-2.5 py-1.5 text-center shadow-md border border-gray-200 min-w-[46px]">
              <span class="block text-[9px] font-bold text-gray-600 uppercase tracking-wider">{{ item.month }}</span>
              <span class="block text-lg font-extrabold font-mono leading-none text-gray-900">{{ item.day }}</span>
            </div>
          </div>

          <!-- Card Body -->
          <div class="p-4 flex-1 flex flex-col justify-between">
            <div>
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{{ item.subtitle }}</p>
              <h3 class="text-sm font-bold text-gray-900 group-hover:text-[#0A2924] transition-colors leading-snug line-clamp-2 mb-3">
                {{ item.title }}
              </h3>
            </div>

            <!-- Read More Link -->
            <div class="pt-2 flex items-center gap-1 text-xs font-semibold text-gray-600 group-hover:text-[#0A2924] transition-colors">
              <span>{{ t('news.readMore') }}</span>
              <v-icon size="14" class="group-hover:translate-x-1 transition-transform">mdi-arrow-right</v-icon>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCmsStore } from '@/stores/cms'
import newsImg1 from '@/assets/card_image.jpg'

defineEmits(['view-all-news'])

const { t, locale } = useI18n()
const cms = useCmsStore()

const isRtl = computed(() => locale.value === 'ar')

const newsItems = computed(() => {
  return cms.newsList.map(n => ({
    id: n.id,
    month: n.month,
    day: n.day,
    category: n.category,
    subtitle: n.subtitle || n.category,
    title: isRtl.value ? n.titleAr : n.titleEn,
    summary: isRtl.value ? n.summaryAr : n.summaryEn,
    image: n.image || newsImg1,
  }))
})
</script>
