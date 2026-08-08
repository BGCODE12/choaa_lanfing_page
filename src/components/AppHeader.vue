<template>
  <header class="sticky top-0 z-50 bg-[#061916]/95 backdrop-blur-md border-b border-[#C5A059]/20 transition-all duration-300">
    <!-- Main Navigation Bar -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        
        <!-- Brand Logo & Name -->
        <div class="flex items-center gap-3 cursor-pointer" @click="$emit('navigate', 'home')">
          <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#C5A059] to-[#8C6B28] flex items-center justify-center p-0.5 shadow-lg shadow-[#C5A059]/20">
            <div class="w-full h-full rounded-full bg-[#061916] flex items-center justify-center">
              <v-icon size="24" class="sm:text-[28px]" color="#C5A059">mdi-mosque</v-icon>
            </div>
          </div>
          <div>
            <h1 class="text-base sm:text-xl font-bold tracking-wider text-white font-serif uppercase">AL-KHOEI</h1>
            <p class="text-[9px] sm:text-[10px] text-[#C5A059] tracking-widest font-semibold uppercase -mt-1">FOUNDATION • EST. 1989</p>
          </div>
        </div>

        <!-- Desktop Navigation Menu (Visible on lg and above: >= 1024px) -->
        <nav class="hidden lg:flex items-center gap-5 xl:gap-6 text-xs xl:text-sm font-medium text-gray-200">
          <a
            v-for="item in navItems"
            :key="item.key"
            href="#"
            @click.prevent="$emit('navigate', item.key)"
            class="hover:text-[#C5A059] transition-colors relative py-2 group whitespace-nowrap"
          >
            {{ item.label }}
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C5A059] transition-all duration-300 group-hover:w-full"></span>
          </a>
        </nav>

        <!-- Right Actions & Hamburger Button -->
        <div class="flex items-center gap-2 sm:gap-3">
          
          <!-- Admin Panel Button -->
          <router-link
            to="/admin"
            class="w-8 h-8 rounded-full bg-white/5 border border-[#C5A059]/30 flex items-center justify-center text-[#E5C483] hover:border-[#C5A059] hover:bg-[#C5A059] hover:text-[#061916] transition-all"
            title="Admin Dashboard"
          >
            <v-icon size="16">mdi-shield-lock-outline</v-icon>
          </router-link>

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
            class="text-xs font-semibold px-2.5 sm:px-3 uppercase border-[#C5A059]/40 hover:bg-[#C5A059]/10"
            @click="toggleLanguage"
          >
            <v-icon start size="16" class="hidden sm:inline-block">mdi-web</v-icon>
            {{ currentLang === 'en' ? 'العربية' : 'EN' }}
          </v-btn>

          <!-- Desktop/Tablet Donate Button -->
          <v-btn
            color="#C5A059"
            theme="dark"
            elevation="4"
            class="hidden sm:flex text-xs font-bold tracking-wider rounded-md px-4 sm:px-5 text-[#061916] hover:bg-[#E5C483] transition-all"
            @click="$emit('open-donate')"
          >
            <v-icon start size="16">mdi-heart</v-icon>
            {{ t('nav.donate') }}
          </v-btn>

          <!-- Mobile & Tablet Hamburger Menu Button -->
          <button
            @click="mobileDrawer = !mobileDrawer"
            class="flex lg:hidden w-10 h-10 rounded-lg bg-white/5 border border-[#C5A059]/30 items-center justify-center text-[#E5C483] hover:bg-[#C5A059]/20 transition-all cursor-pointer"
            title="Toggle Menu"
          >
            <v-icon size="24">{{ mobileDrawer ? 'mdi-close' : 'mdi-menu' }}</v-icon>
          </button>
        </div>

      </div>
    </div>

    <!-- Mobile/Tablet Full Screen Menu Overlay -->
    <Transition name="drawer-fade">
      <div
        v-if="mobileDrawer"
        class="fixed inset-0 z-[100] flex flex-col bg-[#061916] text-white h-screen w-screen overflow-y-auto"
      >
        <!-- Header inside Overlay -->
        <div class="p-5 border-b border-[#C5A059]/20 flex justify-between items-center bg-[#041210]">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059]">
              <v-icon size="22">mdi-mosque</v-icon>
            </div>
            <div>
              <h3 class="font-bold text-sm text-white uppercase tracking-wider">AL-KHOEI FOUNDATION</h3>
              <p class="text-[10px] text-[#C5A059] font-semibold">EST. 1989</p>
            </div>
          </div>
          <button
            @click="mobileDrawer = false"
            class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#C5A059] hover:text-[#061916] transition-all"
          >
            <v-icon size="20">mdi-close</v-icon>
          </button>
        </div>

        <!-- Navigation Links -->
        <div class="p-6 flex-1 space-y-2 overflow-y-auto">
          <a
            v-for="item in navItems"
            :key="item.key"
            href="#"
            @click.prevent="onMobileNav(item.key)"
            class="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-[#C5A059]/20 hover:text-[#E5C483] text-gray-100 font-medium text-base transition-all border border-white/5 hover:border-[#C5A059]/40"
          >
            <span class="font-serif tracking-wide">{{ item.label }}</span>
            <v-icon size="18" class="text-[#C5A059]">{{ isRtl ? 'mdi-arrow-left' : 'mdi-arrow-right' }}</v-icon>
          </a>
        </div>

        <!-- Drawer Footer CTA -->
        <div class="p-6 border-t border-[#C5A059]/20 bg-[#041210] space-y-3">
          <router-link
            to="/admin"
            @click="mobileDrawer = false"
            class="w-full py-3 bg-white/10 border border-[#C5A059]/50 text-white font-bold text-xs rounded-xl uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <v-icon size="18">mdi-shield-lock-outline</v-icon>
            <span>Admin Control Panel</span>
          </router-link>

          <button
            @click="onMobileDonate"
            class="w-full py-4 bg-gradient-to-r from-[#E5C483] via-[#C5A059] to-[#8C6B28] text-[#061916] font-extrabold text-sm rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
          >
            <v-icon size="20">mdi-heart</v-icon>
            <span>{{ t('nav.donate') }}</span>
          </button>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCmsStore } from '@/stores/cms'

const emit = defineEmits(['navigate', 'open-donate', 'open-search', 'toggle-lang'])

const { t, locale } = useI18n()
const cms = useCmsStore()
const mobileDrawer = ref(false)

const currentLang = computed(() => locale.value)
const isRtl = computed(() => locale.value === 'ar')

const navItems = computed(() => {
  return cms.navLinks.map(n => ({
    key: n.key,
    label: locale.value === 'ar' ? n.labelAr : n.labelEn,
  }))
})

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

<style scoped>
.drawer-fade-enter-active,
.drawer-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.drawer-fade-enter-from,
.drawer-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
