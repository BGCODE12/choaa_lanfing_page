<template>
  <div class="min-h-screen bg-[#061916] text-white flex flex-col selection:bg-[#C5A059] selection:text-[#061916]">
    
    <!-- Top Navigation Header -->
    <AppHeader
      @navigate="scrollToSection"
      @open-donate="showDonateModal = true"
      @open-search="showSearchModal = true"
      @toggle-lang="onToggleLang"
    />

    <!-- Main Page Body -->
    <main class="flex-1">
      
      <!-- Hero Section -->
      <section id="home">
        <HeroSection
          @open-programs="scrollToSection('programs')"
          @open-donate="showDonateModal = true"
          @open-prayer-times="showPrayerModal = true"
        />
      </section>

      <!-- Quick Action Grid -->
      <section id="quick-actions">
        <QuickActionGrid @select-action="handleQuickAction" />
      </section>

      <!-- Latest News & Announcements -->
      <section id="news">
        <LatestNewsSection @view-all-news="scrollToSection('news')" />
      </section>

      <!-- Featured Cards: Donation, Live Lecture, Ask Question -->
      <section id="featured">
        <FeaturedGridSection
          @open-donate="showDonateModal = true"
          @open-live="showLiveModal = true"
          @open-ask="showAskModal = true"
        />
      </section>

      <!-- Global Presence & Institutions -->
      <section id="institutions">
        <GlobalPresenceSection
          @view-institutions="scrollToSection('institutions')"
          @view-locations="scrollToSection('institutions')"
        />
      </section>

      <!-- 4 Pillars Footer Banner -->
      <PillarsFooterBanner />

    </main>

    <!-- Footer -->
    <AppFooter id="contact" />

    <!-- Interactive Modals -->
    <DonateModal v-model="showDonateModal" />
    <AskQuestionModal v-model="showAskModal" />
    <PrayerTimesModal v-model="showPrayerModal" />
    <LiveStreamModal v-model="showLiveModal" />

    <!-- Search Overlay Modal -->
    <v-dialog v-model="showSearchModal" max-width="600">
      <div class="bg-[#0A2924] border border-[#C5A059]/40 rounded-2xl p-6 text-white shadow-2xl">
        <div class="flex justify-between items-center mb-4">
          <h4 class="text-base font-bold font-serif text-[#E5C483]">Search Al-Khoei Portal</h4>
          <button @click="showSearchModal = false" class="text-gray-400 hover:text-white"><v-icon>mdi-close</v-icon></button>
        </div>
        <div class="relative">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search fatwas, lectures, books, programs..."
            class="w-full bg-[#061916] border border-[#C5A059]/30 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-[#C5A059]"
          />
          <v-icon class="absolute left-3 top-1/2 -translate-y-1/2" color="#C5A059">mdi-magnify</v-icon>
        </div>
      </div>
    </v-dialog>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import HeroSection from '@/components/HeroSection.vue'
import QuickActionGrid from '@/components/QuickActionGrid.vue'
import LatestNewsSection from '@/components/LatestNewsSection.vue'
import FeaturedGridSection from '@/components/FeaturedGridSection.vue'
import GlobalPresenceSection from '@/components/GlobalPresenceSection.vue'
import PillarsFooterBanner from '@/components/PillarsFooterBanner.vue'
import AppFooter from '@/components/AppFooter.vue'

import DonateModal from '@/components/DonateModal.vue'
import AskQuestionModal from '@/components/AskQuestionModal.vue'
import PrayerTimesModal from '@/components/PrayerTimesModal.vue'
import LiveStreamModal from '@/components/LiveStreamModal.vue'

const showDonateModal = ref(false)
const showAskModal = ref(false)
const showPrayerModal = ref(false)
const showLiveModal = ref(false)
const showSearchModal = ref(false)

const searchQuery = ref('')

function scrollToSection(key: string) {
  const el = document.getElementById(key)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

function handleQuickAction(actionKey: string) {
  if (actionKey === 'donate') {
    showDonateModal.value = true
  } else if (actionKey === 'askQuestion') {
    showAskModal.value = true
  } else if (actionKey === 'liveBroadcast') {
    showLiveModal.value = true
  } else if (actionKey === 'ourInstitutions') {
    scrollToSection('institutions')
  } else {
    alert(`Navigating to ${actionKey} section...`)
  }
}

function onToggleLang(newLang: string) {
  console.log('Language changed to:', newLang)
}
</script>
