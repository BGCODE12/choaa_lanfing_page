<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCmsStore } from '@/stores/cms'

const { locale } = useI18n()
const cms = useCmsStore()

// Dynamic browser tab title and favicon synchronization
watchEffect(() => {
  const isAr = locale.value === 'ar'
  const name = isAr ? cms.siteSettings.siteNameAr : cms.siteSettings.siteNameEn
  const tagline = isAr ? cms.siteSettings.subTitleAr : cms.siteSettings.subTitleEn
  
  document.title = `${name} | ${tagline}`

  if (cms.siteSettings.logoImage) {
    let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement
    if (!link) {
      link = document.createElement('link')
      link.type = 'image/png'
      link.rel = 'shortcut icon'
      document.getElementsByTagName('head')[0].appendChild(link)
    }
    link.href = cms.siteSettings.logoImage
  }
})
</script>
