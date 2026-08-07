<template>
  <section class="py-16 bg-[#061916] text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 pb-4 border-b border-[#C5A059]/20 gap-4">
        <div>
          <div class="flex items-center gap-2 text-xs font-semibold text-[#C5A059] uppercase tracking-widest mb-1">
            <span class="w-2 h-2 rounded-full bg-[#C5A059]"></span>
            <span>Stay Updated</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold font-serif tracking-tight text-white">
            {{ t('news.title') }}
          </h2>
        </div>

        <v-btn
          variant="outlined"
          color="#C5A059"
          size="small"
          class="text-xs font-bold tracking-wider border-[#C5A059]/40 hover:bg-[#C5A059]/10 rounded-md"
          @click="$emit('view-all-news')"
        >
          {{ t('news.viewAll') }}
          <v-icon end size="16">mdi-arrow-right</v-icon>
        </v-btn>
      </div>

      <!-- News Grid Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="item in newsList"
          :key="item.id"
          class="group bg-[#0A2924] border border-[#C5A059]/20 rounded-2xl overflow-hidden hover:border-[#C5A059]/60 hover:shadow-xl hover:shadow-[#C5A059]/10 transition-all duration-300 flex flex-col justify-between cursor-pointer"
        >
          <!-- Card Image & Date Badge -->
          <div class="relative h-48 overflow-hidden">
            <img
              :src="item.image"
              :alt="item.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div class="absolute top-3 left-3 bg-[#061916]/90 backdrop-blur-md border border-[#C5A059]/30 text-white rounded-lg p-2 text-center min-w-[50px] shadow-lg">
              <span class="block text-[10px] font-bold text-[#C5A059] uppercase tracking-wider">{{ item.month }}</span>
              <span class="block text-xl font-extrabold font-mono leading-none">{{ item.day }}</span>
            </div>

            <div class="absolute bottom-3 right-3 bg-[#133E37]/90 backdrop-blur-sm px-2.5 py-1 rounded-full border border-[#C5A059]/30 text-[10px] font-semibold text-[#E5C483] uppercase tracking-wider">
              {{ item.category }}
            </div>
          </div>

          <!-- Card Body -->
          <div class="p-5 flex-1 flex flex-col justify-between">
            <div>
              <p class="text-[11px] font-semibold text-[#C5A059] uppercase tracking-widest mb-1">{{ item.subtitle }}</p>
              <h3 class="text-base font-bold font-serif text-white group-hover:text-[#E5C483] transition-colors leading-snug line-clamp-2 mb-3">
                {{ item.title }}
              </h3>
              <p class="text-xs text-gray-400 font-light line-clamp-2 leading-relaxed mb-4">
                {{ item.summary }}
              </p>
            </div>

            <!-- Read More Link -->
            <div class="pt-3 border-t border-[#C5A059]/15 flex items-center justify-between text-xs font-semibold text-[#C5A059] group-hover:text-white transition-colors">
              <span>{{ t('news.readMore') }}</span>
              <v-icon size="16" class="group-hover:translate-x-1 transition-transform">mdi-arrow-right</v-icon>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import newsImg1 from '@/assets/card_image.jpg'

defineEmits(['view-all-news'])

const { t } = useI18n()

const newsList = [
  {
    id: 1,
    month: 'MAY',
    day: '28',
    category: 'ANNOUNCEMENT',
    subtitle: 'ANNOUNCEMENT',
    title: 'Commemoration of the Martyrdom of Imam Muhammad al-Baqir (a)',
    summary: 'Join us for special lectures and mourning sessions broadcast live from Najaf and London centers.',
    image: newsImg1,
  },
  {
    id: 2,
    month: 'MAY',
    day: '25',
    category: 'NEWS',
    subtitle: 'NEWS',
    title: 'Al-Khoei Foundation Expands Humanitarian Aid Programs',
    summary: 'New food security and orphan sponsorship drives launched in East Africa and South Asia.',
    image: newsImg1,
  },
  {
    id: 3,
    month: 'MAY',
    day: '22',
    category: 'EVENT',
    subtitle: 'EVENT',
    title: 'Weekly Religious Lecture - Sayyid Ahmed Al-Khoei',
    summary: 'In-depth analysis of jurisprudential and moral philosophy in modern contemporary society.',
    image: newsImg1,
  },
  {
    id: 4,
    month: 'MAY',
    day: '20',
    category: 'HUMANITARIAN',
    subtitle: 'HUMANITARIAN',
    title: 'Aid Distribution in Support of Orphans and Families',
    summary: 'Essential medical kits, educational supplies, and monthly stipends delivered to over 5,000 households.',
    image: newsImg1,
  },
]
</script>
