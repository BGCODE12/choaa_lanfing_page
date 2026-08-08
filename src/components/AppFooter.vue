<template>
  <footer class="bg-[#030E0C] text-gray-300 border-t border-[#C5A059]/20 pt-16 pb-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#C5A059]/15">
        
        <!-- Col 1: Brand Info (Span 4) -->
        <div class="lg:col-span-4 space-y-4">
          <div class="flex items-center gap-3">
            <div v-if="cms.siteSettings.logoImage" class="w-10 h-10 rounded-full overflow-hidden border border-[#C5A059]">
              <img :src="cms.siteSettings.logoImage" alt="Logo" class="w-full h-full object-cover" />
            </div>
            <div v-else class="w-10 h-10 rounded-full bg-gradient-to-br from-[#C5A059] to-[#8C6B28] p-0.5 flex items-center justify-center">
              <div class="w-full h-full rounded-full bg-[#061916] flex items-center justify-center">
                <v-icon size="22" color="#C5A059">mdi-mosque</v-icon>
              </div>
            </div>
            <div>
              <h3 class="text-lg font-bold font-serif text-white tracking-wider uppercase">
                {{ isRtl ? cms.siteSettings.siteNameAr : cms.siteSettings.siteNameEn }}
              </h3>
              <p class="text-[10px] text-[#C5A059] tracking-widest font-semibold uppercase -mt-1">
                {{ isRtl ? cms.siteSettings.subTitleAr : cms.siteSettings.subTitleEn }}
              </p>
            </div>
          </div>

          <p class="text-xs text-gray-400 font-light leading-relaxed">
            {{ t('footer.aboutText') }}
          </p>

          <div class="flex items-center gap-3 text-white pt-2">
            <a :href="cms.socialLinks.facebook" target="_blank" class="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#C5A059] hover:text-[#C5A059] transition-all"><v-icon size="16">mdi-facebook</v-icon></a>
            <a :href="cms.socialLinks.youtube" target="_blank" class="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#C5A059] hover:text-[#C5A059] transition-all"><v-icon size="16">mdi-youtube</v-icon></a>
            <a :href="cms.socialLinks.instagram" target="_blank" class="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#C5A059] hover:text-[#C5A059] transition-all"><v-icon size="16">mdi-instagram</v-icon></a>
            <a :href="cms.socialLinks.twitter" target="_blank" class="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#C5A059] hover:text-[#C5A059] transition-all"><v-icon size="16">mdi-twitter</v-icon></a>
            <a :href="cms.socialLinks.telegram" target="_blank" class="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#C5A059] hover:text-[#C5A059] transition-all"><v-icon size="16">mdi-paper-plane</v-icon></a>
          </div>
        </div>

        <!-- Col 2: Quick Links (Span 3) -->
        <div class="lg:col-span-3 space-y-3">
          <h4 class="text-xs font-bold font-serif text-[#C5A059] uppercase tracking-wider border-b border-[#C5A059]/20 pb-2 inline-block">
            {{ t('footer.quickLinks') }}
          </h4>
          <ul class="space-y-2 text-xs">
            <li><a href="#about" class="hover:text-[#C5A059] transition-colors">About Sayyid Al-Khoei (ra)</a></li>
            <li><a :href="cms.fatwaSettings.fatwaUrl" target="_blank" class="hover:text-[#C5A059] transition-colors">Islamic Jurisprudence & Fatwas</a></li>
            <li><a href="#institutions" class="hover:text-[#C5A059] transition-colors">Seminaries & Educational Centers</a></li>
            <li><a href="#donate" class="hover:text-[#C5A059] transition-colors">Orphan & Family Relief Fund</a></li>
            <li><a href="#news" class="hover:text-[#C5A059] transition-colors">Publications & News</a></li>
          </ul>
        </div>

        <!-- Col 3: Contact Info (Span 3) -->
        <div class="lg:col-span-3 space-y-3">
          <h4 class="text-xs font-bold font-serif text-[#C5A059] uppercase tracking-wider border-b border-[#C5A059]/20 pb-2 inline-block">
            {{ t('footer.contactUs') }}
          </h4>
          <ul class="space-y-2.5 text-xs text-gray-400">
            <li class="flex items-start gap-2">
              <v-icon size="16" color="#C5A059">mdi-map-marker</v-icon>
              <span>{{ isRtl ? cms.footerInfo.addressAr : cms.footerInfo.addressEn }}</span>
            </li>
            <li class="flex items-center gap-2">
              <v-icon size="16" color="#C5A059">mdi-phone</v-icon>
              <span>{{ cms.footerInfo.phone }}</span>
            </li>
            <li class="flex items-center gap-2">
              <v-icon size="16" color="#C5A059">mdi-email</v-icon>
              <span>{{ cms.footerInfo.email }}</span>
            </li>
          </ul>
        </div>

        <!-- Col 4: Newsletter Subscription (Span 2) -->
        <div class="lg:col-span-2 space-y-3">
          <h4 class="text-xs font-bold font-serif text-[#C5A059] uppercase tracking-wider border-b border-[#C5A059]/20 pb-2 inline-block">
            Newsletter
          </h4>
          <p class="text-[11px] text-gray-400">Subscribe for updates on programs and fatwas.</p>

          <div class="space-y-2">
            <input
              type="email"
              placeholder="Your email address"
              class="w-full text-xs px-3 py-2 bg-[#061916] border border-[#C5A059]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#C5A059]"
            />
            <v-btn
              block
              color="#C5A059"
              size="small"
              class="text-xs font-bold text-[#061916]"
            >
              Subscribe
            </v-btn>
          </div>
        </div>

      </div>

      <!-- Bottom Bar -->
      <div class="pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
        <p>{{ t('footer.rights') }}</p>
        <div class="flex items-center gap-4">
          <a href="#" class="hover:text-gray-300">Privacy Policy</a>
          <span>•</span>
          <a href="#" class="hover:text-gray-300">Terms of Service</a>
          <span>•</span>
          <a href="#" class="hover:text-gray-300">Sitemap</a>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCmsStore } from '@/stores/cms'

const { t, locale } = useI18n()
const cms = useCmsStore()

const isRtl = computed(() => locale.value === 'ar')
</script>
