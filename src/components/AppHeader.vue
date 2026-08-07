<template>
  <header class="sticky top-0 z-50 bg-[#061916]/90 backdrop-blur-md border-b border-[#C5A059]/20 transition-all duration-300">
    <!-- Top Bar -->
    <div class="bg-[#041210] text-[#E5C483] text-xs py-1.5 px-4 hidden md:block border-b border-[#C5A059]/10">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <div class="flex items-center gap-4">
          <span class="flex items-center gap-1">
            <v-icon size="14">mdi-map-marker</v-icon>
            London, UK | Najaf, Iraq | New York, USA
          </span>
          <span class="flex items-center gap-1">
            <v-icon size="14">mdi-email</v-icon>
            info@al-khoei.org
          </span>
        </div>
        <div class="flex items-center gap-4">
          <span>{{ currentHijriDate }}</span>
          <v-divider vertical class="h-3 border-opacity-20" color="#C5A059" />
          <div class="flex items-center gap-2">
            <a href="#" class="hover:text-white transition-colors" title="Facebook"><v-icon size="14">mdi-facebook</v-icon></a>
            <a href="#" class="hover:text-white transition-colors" title="YouTube"><v-icon size="14">mdi-youtube</v-icon></a>
            <a href="#" class="hover:text-white transition-colors" title="Instagram"><v-icon size="14">mdi-instagram</v-icon></a>
            <a href="#" class="hover:text-white transition-colors" title="Twitter/X"><v-icon size="14">mdi-twitter</v-icon></a>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Navigation Bar -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        
        <!-- Brand Logo & Name -->
        <div class="flex items-center gap-3 cursor-pointer" @click="$emit('navigate', 'home')">
          <div class="w-12 h-12 rounded-full bg-gradient-to-br from-[#C5A059] to-[#8C6B28] flex items-center justify-center p-0.5 shadow-lg shadow-[#C5A059]/20">
            <div class="w-full h-full rounded-full bg-[#061916] flex items-center justify-center">
              <v-icon size="28" color="#C5A059">mdi-mosque</v-icon>
            </div>
          </div>
          <div>
            <h1 class="text-xl font-bold tracking-wider text-white font-serif uppercase">AL-KHOEI</h1>
            <p class="text-[10px] text-[#C5A059] tracking-widest font-semibold uppercase -mt-1">FOUNDATION • EST. 1989</p>
          </div>
        </div>

        <!-- Desktop Navigation Menu -->
        <nav class="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-200">
          <a
            v-for="item in navItems"
            :key="item.key"
            href="#"
            @click.prevent="$emit('navigate', item.key)"
            class="hover:text-[#C5A059] transition-colors relative py-2 group"
          >
            {{ t(item.labelKey) }}
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C5A059] transition-all duration-300 group-hover:w-full"></span>
          </a>
        </nav>

        <!-- Right Action Items (Search, Language Switcher, Donate CTA) -->
        <div class="hidden sm:flex items-center gap-3">
          <!-- Search Button -->
          <v-btn
            icon="mdi-magnify"
            variant="text"
            color="#C5A059"
            size="small"
            @click="$emit('open-search')"
            title="Search"
          />

          <!-- Language Switcher Button -->
          <v-btn
            variant="outlined"
            color="#C5A059"
            size="small"
            class="text-xs font-semibold px-3 uppercase border-[#C5A059]/40 hover:bg-[#C5A059]/10"
            @click="toggleLanguage"
          >
            <v-icon start size="16">mdi-web</v-icon>
            {{ currentLang === 'en' ? 'العربية' : 'EN' }}
          </v-btn>

          <!-- Donate Button -->
          <v-btn
            color="#C5A059"
            theme="dark"
            elevation="4"
            class="text-xs font-bold tracking-wider rounded-md px-5 text-[#061916] hover:bg-[#E5C483] transition-all"
            @click="$emit('open-donate')"
          >
            <v-icon start size="16">mdi-heart</v-icon>
            {{ t('nav.donate') }}
          </v-btn>
        </div>

        <!-- Mobile Menu Hamburger Button -->
        <div class="flex sm:hidden items-center gap-2">
          <v-btn
            variant="text"
            color="#C5A059"
            size="small"
            @click="toggleLanguage"
            class="text-xs font-bold"
          >
            {{ currentLang === 'en' ? 'عربي' : 'EN' }}
          </v-btn>
          <v-btn
            icon="mdi-menu"
            variant="text"
            color="white"
            @click="mobileDrawer = !mobileDrawer"
          />
        </div>
      </div>
    </div>

    <!-- Mobile Drawer Navigation -->
    <v-navigation-drawer
      v-model="mobileDrawer"
      location="right"
      temporary
      bg-color="#061916"
      class="text-white"
    >
      <div class="p-4 border-b border-[#C5A059]/20 flex justify-between items-center">
        <div class="flex items-center gap-2">
          <v-icon color="#C5A059">mdi-mosque</v-icon>
          <span class="font-bold text-sm text-[#C5A059]">AL-KHOEI FOUNDATION</span>
        </div>
        <v-btn icon="mdi-close" variant="text" size="small" @click="mobileDrawer = false" />
      </div>

      <v-list class="bg-transparent text-gray-200">
        <v-list-item
          v-for="item in navItems"
          :key="item.key"
          @click="onMobileNav(item.key)"
          class="hover:bg-[#C5A059]/10 hover:text-[#C5A059] py-3"
        >
          <v-list-item-title class="text-sm font-medium">{{ t(item.labelKey) }}</v-list-item-title>
        </v-list-item>
      </v-list>

      <div class="p-4 space-y-3">
        <v-btn
          block
          color="#C5A059"
          class="text-xs font-bold text-[#061916]"
          @click="onMobileDonate"
        >
          <v-icon start size="16">mdi-heart</v-icon>
          {{ t('nav.donate') }}
        </v-btn>
      </div>
    </v-navigation-drawer>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const emit = defineEmits(['navigate', 'open-donate', 'open-search', 'toggle-lang'])

const { t, locale } = useI18n()
const mobileDrawer = ref(false)

const currentLang = computed(() => locale.value)
const currentHijriDate = ref('22 Dhul Qadah 1445 AH')

const navItems = [
  { key: 'home', labelKey: 'nav.home' },
  { key: 'about', labelKey: 'nav.aboutUs' },
  { key: 'programs', labelKey: 'nav.programs' },
  { key: 'institutions', labelKey: 'nav.institutions' },
  { key: 'library', labelKey: 'nav.library' },
  { key: 'news', labelKey: 'nav.newsEvents' },
  { key: 'fatwas', labelKey: 'nav.fatwas' },
  { key: 'live', labelKey: 'nav.live' },
  { key: 'contact', labelKey: 'nav.contact' },
]

function toggleLanguage() {
  const newLocale = locale.value === 'en' ? 'ar' : 'en'
  locale.value = newLocale
  document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr'
  emit('toggle-lang', newLocale)
}

function onMobileNav(key: string) {
  mobileDrawer.value = false
  emit('navigate', key)
}

function onMobileDonate() {
  mobileDrawer.value = false
  emit('open-donate')
}
</script>
