<template>
  <section class="py-12 bg-[#041210] border-t border-[#C5A059]/20 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
        
        <div
          v-for="pillar in pillars"
          :key="pillar.titleKey"
          class="flex flex-col items-center sm:items-start space-y-3 p-4 rounded-xl bg-[#061916]/50 border border-[#C5A059]/10 hover:border-[#C5A059]/40 transition-all duration-300 group"
        >
          <div class="w-12 h-12 rounded-full bg-[#0A2924] border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-[#061916] transition-colors shadow-lg">
            <v-icon size="24">{{ pillar.icon }}</v-icon>
          </div>
          <div>
            <h4 class="text-sm font-bold font-serif text-white group-hover:text-[#E5C483] transition-colors">
              {{ t(pillar.titleKey) }}
            </h4>
            <p class="text-xs text-gray-400 font-light mt-1 leading-relaxed">
              {{ t(pillar.descKey) }}
            </p>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const pillars = [
  {
    icon: 'mdi-book-open-page-variant-outline',
    titleKey: 'pillars.heritageTitle',
    descKey: 'pillars.heritageDesc',
  },
  {
    icon: 'mdi-[#C5A059] mdi-hand-heart-outline',
    titleKey: 'pillars.humanityTitle',
    descKey: 'pillars.humanityDesc',
  },
  {
    icon: 'mdi-auto-stories',
    titleKey: 'pillars.knowledgeTitle',
    descKey: 'pillars.knowledgeDesc',
  },
  {
    icon: 'mdi-account-group-outline',
    titleKey: 'pillars.futureTitle',
    descKey: 'pillars.futureDesc',
  },
]
</script>
