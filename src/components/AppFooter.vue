<template>
  <footer class="bg-[#030E0C] text-gray-300 border-t border-[#C5A059]/20 pt-16 pb-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#C5A059]/15">
        
        <!-- Col 1: Brand Info (Span 4) -->
        <div class="lg:col-span-4 space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#C5A059] to-[#8C6B28] p-0.5 flex items-center justify-center">
              <div class="w-full h-full rounded-full bg-[#061916] flex items-center justify-center">
                <v-icon size="22" color="#C5A059">mdi-mosque</v-icon>
              </div>
            </div>
            <div>
              <h3 class="text-lg font-bold font-serif text-white tracking-wider uppercase">AL-KHOEI FOUNDATION</h3>
              <p class="text-[10px] text-[#C5A059] tracking-widest font-semibold uppercase -mt-1">GLOBAL ISLAMIC ORGANIZATION</p>
            </div>
          </div>

          <p class="text-xs text-gray-400 font-light leading-relaxed">
            {{ t('footer.aboutText') }}
          </p>

          <div class="flex items-center gap-3 text-white pt-2">
            <a href="#" class="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#C5A059] hover:text-[#C5A059] transition-all"><v-icon size="16">mdi-facebook</v-icon></a>
            <a href="#" class="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#C5A059] hover:text-[#C5A059] transition-all"><v-icon size="16">mdi-youtube</v-icon></a>
            <a href="#" class="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#C5A059] hover:text-[#C5A059] transition-all"><v-icon size="16">mdi-instagram</v-icon></a>
            <a href="#" class="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#C5A059] hover:text-[#C5A059] transition-all"><v-icon size="16">mdi-twitter</v-icon></a>
          </div>
        </div>

        <!-- Col 2: Quick Links (Span 3) -->
        <div class="lg:col-span-3 space-y-3">
          <h4 class="text-sm font-bold font-serif text-white uppercase tracking-wider border-b border-[#C5A059]/20 pb-2 inline-block">
            {{ t('footer.quickLinks') }}
          </h4>
          <ul class="space-y-2 text-xs">
            <li><a href="#" class="hover:text-[#C5A059] transition-colors">About Sayyid Al-Khoei (ra)</a></li>
            <li><a href="#" class="hover:text-[#C5A059] transition-colors">Islamic Jurisprudence & Fatwas</a></li>
            <li><a href="#" class="hover:text-[#C5A059] transition-colors">Seminaries & Educational Centers</a></li>
            <li><a href="#" class="hover:text-[#C5A059] transition-colors">Orphan & Family Relief Fund</a></li>
            <li><a href="#" class="hover:text-[#C5A059] transition-colors">Publications & Research Papers</a></li>
            <li><a href="#" class="hover:text-[#C5A059] transition-colors">UN ECOSOC Activities</a></li>
          </ul>
        </div>

        <!-- Col 3: Contact Info (Span 3) -->
        <div class="lg:col-span-3 space-y-3">
          <h4 class="text-sm font-bold font-serif text-white uppercase tracking-wider border-b border-[#C5A059]/20 pb-2 inline-block">
            {{ t('footer.contactUs') }}
          </h4>
          <ul class="space-y-2.5 text-xs text-gray-400">
            <li class="flex items-start gap-2">
              <v-icon size="16" color="#C5A059">mdi-map-marker</v-icon>
              <span>Chevening Road, Queens Park, London NW6 6TN, United Kingdom</span>
            </li>
            <li class="flex items-center gap-2">
              <v-icon size="16" color="#C5A059">mdi-phone</v-icon>
              <span>+44 (0) 20 7372 4000</span>
            </li>
            <li class="flex items-center gap-2">
              <v-icon size="16" color="#C5A059">mdi-email</v-icon>
              <span>contact@al-khoei.org</span>
            </li>
          </ul>
        </div>

        <!-- Col 4: Newsletter Subscription (Span 2) -->
        <div class="lg:col-span-2 space-y-3">
          <h4 class="text-sm font-bold font-serif text-white uppercase tracking-wider border-b border-[#C5A059]/20 pb-2 inline-block">
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
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
