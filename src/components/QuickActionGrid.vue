<template>
  <section class="py-12 bg-[#08221E] border-y border-[#C5A059]/20 relative z-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
        
        <div
          v-for="action in actions"
          :key="action.key"
          @click="$emit('select-action', action.key)"
          class="group bg-[#0A2924]/80 backdrop-blur-md border border-[#C5A059]/20 rounded-xl p-5 text-center hover:border-[#C5A059] hover:bg-[#133E37]/90 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-[#C5A059]/15 flex flex-col items-center justify-between"
        >
          <!-- Action Icon Circle -->
          <div class="w-14 h-14 rounded-full bg-gradient-to-br from-[#1A4D45] to-[#0A2924] border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] group-hover:scale-110 group-hover:bg-[#C5A059] group-hover:text-[#061916] transition-all duration-300 mb-3 shadow-inner">
            <v-icon size="26">{{ action.icon }}</v-icon>
          </div>

          <!-- Title & Subtitle -->
          <div>
            <h4 class="text-xs sm:text-sm font-bold text-white tracking-wider group-hover:text-[#E5C483] transition-colors uppercase">
              {{ t(action.titleKey) }}
            </h4>
            <p class="text-[11px] text-gray-400 font-light mt-1.5 line-clamp-2 leading-snug">
              {{ t(action.descKey) }}
            </p>
          </div>
          
          <!-- Bottom Accent Bar -->
          <div class="w-8 h-0.5 bg-[#C5A059]/30 group-hover:w-14 group-hover:bg-[#C5A059] transition-all duration-300 mt-4 rounded-full"></div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineEmits(['select-action'])

const { t } = useI18n()

const actions = [
  {
    key: 'liveBroadcast',
    icon: 'mdi-video-outline',
    titleKey: 'quickActions.liveBroadcast',
    descKey: 'quickActions.liveBroadcastDesc',
  },
  {
    key: 'donate',
    icon: 'mdi-hand-heart-outline',
    titleKey: 'quickActions.donate',
    descKey: 'quickActions.donateDesc',
  },
  {
    key: 'askQuestion',
    icon: 'mdi-help-circle-outline',
    titleKey: 'quickActions.askQuestion',
    descKey: 'quickActions.askQuestionDesc',
  },
  {
    key: 'islamicLibrary',
    icon: 'mdi-book-open-variant',
    titleKey: 'quickActions.islamicLibrary',
    descKey: 'quickActions.islamicLibraryDesc',
  },
  {
    key: 'ourInstitutions',
    icon: 'mdi-office-building-outline',
    titleKey: 'quickActions.ourInstitutions',
    descKey: 'quickActions.ourInstitutionsDesc',
  },
  {
    key: 'shop',
    icon: 'mdi-bag-handle-outline',
    titleKey: 'quickActions.shop',
    descKey: 'quickActions.shopDesc',
  },
]
</script>
