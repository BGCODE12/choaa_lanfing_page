<template>
  <section class="py-10 bg-white border-b border-gray-200 relative z-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
        
        <div
          v-for="action in actions"
          :key="action.key"
          @click="$emit('select-action', action.key)"
          class="group bg-white border border-gray-200 rounded-xl p-5 text-center hover:border-[#0A2924] hover:bg-gray-50 hover:-translate-y-1 transition-all duration-300 cursor-pointer shadow-xs hover:shadow-md flex flex-col items-center justify-between"
        >
          <!-- Action Icon Circle -->
          <div class="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center text-[#0A2924] group-hover:scale-110 group-hover:bg-[#0A2924] group-hover:text-[#C5A059] group-hover:border-[#0A2924] transition-all duration-300 mb-3 shadow-inner">
            <v-icon size="26">{{ action.icon }}</v-icon>
          </div>

          <!-- Title & Subtitle -->
          <div>
            <h4 class="text-xs sm:text-sm font-bold text-gray-900 tracking-wider group-hover:text-[#0A2924] transition-colors uppercase">
              {{ t(action.titleKey) }}
            </h4>
            <p class="text-[11px] text-gray-500 font-normal mt-1.5 line-clamp-2 leading-snug">
              {{ t(action.descKey) }}
            </p>
          </div>
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
