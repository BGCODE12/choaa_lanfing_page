<template>
  <div class="min-h-screen bg-white text-gray-900 flex flex-col selection:bg-[#C5A059] selection:text-[#061916]">
    
    <!-- Top Navigation Header -->
    <AppHeader
      @navigate="scrollToSection"
      @open-donate="showDonateModal = true"
      @open-search="showSearchModal = true"
      @toggle-lang="onToggleLang"
    />

    <!-- Main Page Body -->
    <main class="flex-1">
      
      <!-- Hero Section (Pure Image Carousel Banner) -->
      <section id="home">
        <HeroSection />
      </section>

      <!-- Prayer Times Section (Sayyid Al-Khoei NY Calculations) -->
      <section id="prayer-times">
        <PrayerTimesSection />
      </section>

      <!-- Quick Action Grid (White Background) -->
      <section id="quick-actions">
        <QuickActionGrid @select-action="handleQuickAction" />
      </section>

      <!-- Donation Campaigns & Causes Carousel (Dark Emerald & Gold Royal Design) -->
      <section id="campaigns">
        <DonationCampaignsSection @open-donate="showDonateModal = true" />
      </section>

      <!-- Latest News & Announcements (White Background) -->
      <section id="news">
        <LatestNewsSection @view-all-news="scrollToSection('news')" />
      </section>

      <!-- Featured Cards: Donation, Live Lecture, Ask Question (Light Grey Background) -->
      <section id="featured">
        <FeaturedGridSection
          @open-donate="showDonateModal = true"
          @open-live="showLiveModal = true"
          @open-ask="openAskQuestionUrl"
        />
      </section>

      <!-- Global Presence & Institutions (White Background) -->
      <section id="institutions">
        <GlobalPresenceSection
          @view-institutions="scrollToSection('institutions')"
          @view-locations="scrollToSection('institutions')"
        />
      </section>

      <!-- 4 Pillars Banner (Dark Emerald Accent Section) -->
      <PillarsFooterBanner />

    </main>

    <!-- Footer (Dark Footer) -->
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
import { useCmsStore } from '@/stores/cms'

import AppHeader from '@/components/AppHeader.vue'
import HeroSection from '@/components/HeroSection.vue'
import PrayerTimesSection from '@/components/PrayerTimesSection.vue'
import QuickActionGrid from '@/components/QuickActionGrid.vue'
import DonationCampaignsSection from '@/components/DonationCampaignsSection.vue'
import LatestNewsSection from '@/components/LatestNewsSection.vue'
import FeaturedGridSection from '@/components/FeaturedGridSection.vue'
import GlobalPresenceSection from '@/components/GlobalPresenceSection.vue'
import PillarsFooterBanner from '@/components/PillarsFooterBanner.vue'
import AppFooter from '@/components/AppFooter.vue'

import DonateModal from '@/components/DonateModal.vue'
import AskQuestionModal from '@/components/AskQuestionModal.vue'
import PrayerTimesModal from '@/components/PrayerTimesModal.vue'
import LiveStreamModal from '@/components/LiveStreamModal.vue'

const cms = useCmsStore()

const showDonateModal = ref(false)
const showAskModal = ref(false)
const showPrayerModal = ref(false)
const showLiveModal = ref(false)
const showSearchModal = ref(false)

const searchQuery = ref('')

function openAskQuestionUrl() {
  const url = cms.fatwaSettings?.fatwaUrl || 'https://al-khoei.org/fatwas'
  if (url.startsWith('#')) {
    scrollToSection(url.replace('#', ''))
  } else {
    window.open(url, '_blank')
  }
}

function scrollToSection(key: string) {
  const el = document.getElementById(key)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

function handleHeroAction(action: string) {
  if (action === 'donate') {
    showDonateModal.value = true
  } else if (action === 'institutions' || action === 'humanitarian') {
    scrollToSection('institutions')
  } else if (action === 'library') {
    window.open('https://al-khoei.org/library', '_blank')
  } else {
    scrollToSection('institutions')
  }
}

function handleQuickAction(actionKey: string) {
  if (actionKey === 'donate') {
    showDonateModal.value = true
  } else if (actionKey === 'askQuestion') {
    openAskQuestionUrl()
  } else if (actionKey === 'liveBroadcast') {
    showLiveModal.value = true
  } else if (actionKey === 'ourInstitutions') {
    scrollToSection('institutions')
  } else if (actionKey === 'islamicLibrary') {
    window.open('https://al-khoei.org/library', '_blank')
  } else if (actionKey === 'shop') {
    window.open('https://al-khoei.org/shop', '_blank')
  } else {
    scrollToSection('institutions')
  }
}

function onToggleLang(newLang: string) {
  console.log('Language changed to:', newLang)
}
</script>
