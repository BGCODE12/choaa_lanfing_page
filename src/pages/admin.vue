<template>
  <div class="min-h-screen bg-[#041210] text-gray-100 font-sans flex flex-col selection:bg-[#C5A059] selection:text-[#061916]">
    
    <!-- Admin Header Bar -->
    <header class="bg-[#061916] border-b border-[#C5A059]/30 sticky top-0 z-50 shadow-xl">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#C5A059] to-[#8C6B28] p-0.5 shadow-lg">
            <div class="w-full h-full rounded-full bg-[#061916] flex items-center justify-center text-[#E5C483]">
              <v-icon size="22">mdi-shield-crown-outline</v-icon>
            </div>
          </div>
          <div>
            <h1 class="text-base sm:text-lg font-bold font-serif text-white tracking-wider uppercase">
              AL-KHOEI CMS ADMIN
            </h1>
            <p class="text-[10px] text-[#C5A059] font-mono">Control Panel & Content Manager</p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <router-link
            to="/"
            class="px-4 py-2 bg-white/10 border border-white/20 hover:border-[#C5A059] text-xs font-bold text-white rounded-lg flex items-center gap-1.5 transition-all"
          >
            <v-icon size="16">mdi-eye-outline</v-icon>
            <span>View Live Site</span>
          </router-link>

          <button
            v-if="cms.isAuthenticated"
            @click="onLogout"
            class="px-4 py-2 bg-red-600/20 border border-red-500/40 text-red-300 hover:bg-red-600 hover:text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all"
          >
            <v-icon size="16">mdi-logout</v-icon>
            <span>Logout</span>
          </button>
        </div>

      </div>
    </header>

    <!-- Passcode Security Shield (If Not Authenticated) -->
    <div v-if="!cms.isAuthenticated" class="flex-1 flex items-center justify-center p-4">
      <div class="max-w-md w-full bg-[#061916] border-2 border-[#C5A059]/40 rounded-3xl p-8 shadow-2xl space-y-6 text-center">
        
        <div class="w-16 h-16 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/40 mx-auto flex items-center justify-center text-[#E5C483] shadow-lg">
          <v-icon size="36">mdi-lock-shield-outline</v-icon>
        </div>

        <div>
          <h2 class="text-2xl font-bold font-serif text-white tracking-wide">Secured Admin Access</h2>
          <p class="text-xs text-gray-400 mt-1">Enter your secret passcode to access full site controls.</p>
        </div>

        <form @submit.prevent="onLogin" class="space-y-4 text-left">
          <div>
            <label class="block text-xs font-semibold text-[#C5A059] uppercase tracking-wider mb-2">Secret Passcode / PIN</label>
            <div class="relative">
              <input
                :type="showPin ? 'text' : 'password'"
                v-model="pinInput"
                placeholder="Enter passcode..."
                class="w-full bg-[#041210] border border-[#C5A059]/40 rounded-xl py-3 px-4 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#C5A059] font-mono tracking-widest"
              />
              <button
                type="button"
                @click="showPin = !showPin"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <v-icon size="18">{{ showPin ? 'mdi-eye-off-outline' : 'mdi-eye-outline' }}</v-icon>
              </button>
            </div>
            <p v-if="loginError" class="text-xs text-red-400 mt-2 font-medium flex items-center gap-1">
              <v-icon size="14">mdi-alert-circle</v-icon>
              <span>Invalid passcode. Please try again.</span>
            </p>
          </div>

          <button
            type="submit"
            class="w-full py-3.5 bg-gradient-to-r from-[#E5C483] via-[#C5A059] to-[#8C6B28] text-[#061916] font-extrabold text-sm uppercase tracking-wider rounded-xl shadow-lg hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <v-icon size="18">mdi-key-variant</v-icon>
            <span>Unlock Admin Panel</span>
          </button>
        </form>

        <div class="pt-4 border-t border-white/10 text-[11px] text-gray-500 font-mono">
          Default Passcode: <strong class="text-[#E5C483]">123456</strong>
        </div>

      </div>
    </div>

    <!-- Authenticated CMS Control Panel Dashboard -->
    <div v-else class="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 space-y-6">
      
      <!-- Top Success Alert Toast -->
      <div v-if="toastMessage" class="p-4 rounded-xl bg-emerald-900/60 border border-emerald-500/50 text-emerald-200 text-xs font-semibold flex items-center justify-between shadow-lg">
        <div class="flex items-center gap-2">
          <v-icon color="#34D399" size="18">mdi-check-circle</v-icon>
          <span>{{ toastMessage }}</span>
        </div>
        <button @click="toastMessage = ''" class="text-gray-400 hover:text-white"><v-icon size="16">mdi-close</v-icon></button>
      </div>

      <!-- Main Navigation Tabs -->
      <div class="flex flex-wrap items-center gap-2 border-b border-[#C5A059]/20 pb-4 overflow-x-auto">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer',
            activeTab === tab.id
              ? 'bg-[#C5A059] text-[#061916] shadow-lg shadow-[#C5A059]/20'
              : 'bg-[#061916] text-gray-300 hover:bg-white/10 hover:text-white border border-white/10'
          ]"
        >
          <v-icon size="16">{{ tab.icon }}</v-icon>
          <span>{{ tab.label }}</span>
        </button>
      </div>

      <!-- Tab Content: Site Logo & Branding Settings -->
      <div v-if="activeTab === 'branding'" class="bg-[#061916] border border-[#C5A059]/30 rounded-2xl p-6 space-y-6 shadow-xl max-w-3xl">
        <div class="border-b border-white/10 pb-4">
          <h3 class="text-base font-bold font-serif text-white">Site Logo & Name Settings (اسم وشعار الموقع)</h3>
          <p class="text-xs text-gray-400">Upload your official brand logo image and change header & footer titles.</p>
        </div>

        <div class="space-y-4 text-xs">
          <!-- Logo File Upload -->
          <div class="bg-[#041210] p-4 rounded-xl border border-white/10 space-y-3">
            <label class="block text-xs font-bold text-[#E5C483] uppercase">Website Logo Image (Upload File or URL)</label>
            <div class="flex flex-col sm:flex-row items-center gap-3">
              <label class="px-4 py-2.5 bg-[#C5A059] text-[#061916] font-extrabold rounded cursor-pointer hover:bg-[#E5C483] flex items-center gap-1.5 shadow-md">
                <v-icon size="16">mdi-upload</v-icon>
                <span>Upload Logo File</span>
                <input type="file" accept="image/*" class="hidden" @change="onLogoFileUpload" />
              </label>
              <input v-model="cms.siteSettings.logoImage" placeholder="Or Image URL / Data Base64..." class="flex-1 w-full bg-[#061916] border border-white/20 rounded p-2.5 text-white font-mono" />
            </div>

            <div class="flex items-center gap-3 mt-2">
              <div v-if="cms.siteSettings.logoImage" class="w-16 h-16 rounded-full overflow-hidden border-2 border-[#C5A059] bg-[#061916]">
                <img :src="cms.siteSettings.logoImage" alt="Logo Preview" class="w-full h-full object-cover" />
              </div>
              <span v-if="cms.siteSettings.logoImage" class="text-emerald-400 font-mono text-[10px]">Custom Logo Active</span>
              <button v-if="cms.siteSettings.logoImage" @click="cms.siteSettings.logoImage = ''" class="text-red-400 hover:text-red-300 text-[11px] underline">Remove Logo</button>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-300 font-bold mb-1">Site Name (EN)</label>
              <input v-model="cms.siteSettings.siteNameEn" class="w-full bg-[#041210] border border-white/20 rounded p-2.5 text-white" />
            </div>
            <div>
              <label class="block text-gray-300 font-bold mb-1">Site Name (AR)</label>
              <input v-model="cms.siteSettings.siteNameAr" class="w-full bg-[#041210] border border-white/20 rounded p-2.5 text-white text-right" />
            </div>

            <div>
              <label class="block text-gray-300 font-bold mb-1">Subtitle / Tagline (EN)</label>
              <input v-model="cms.siteSettings.subTitleEn" class="w-full bg-[#041210] border border-white/20 rounded p-2.5 text-white" />
            </div>
            <div>
              <label class="block text-gray-300 font-bold mb-1">Subtitle / Tagline (AR)</label>
              <input v-model="cms.siteSettings.subTitleAr" class="w-full bg-[#041210] border border-white/20 rounded p-2.5 text-white text-right" />
            </div>
          </div>

          <button @click="showToast('Site logo & name settings saved!')" class="px-6 py-2.5 bg-[#C5A059] text-[#061916] font-bold text-xs rounded-lg hover:bg-[#E5C483] cursor-pointer">
            Save Branding Settings
          </button>
        </div>
      </div>

      <!-- Tab Content: Donation Campaigns / Types Manager (NEW) -->
      <div v-if="activeTab === 'campaigns'" class="bg-[#061916] border border-[#C5A059]/30 rounded-2xl p-6 space-y-6 shadow-xl">
        <div class="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-white/10 pb-4">
          <div>
            <h3 class="text-base font-bold font-serif text-white">Donation Campaigns & Causes (إعلانات وأبواب التبرع)</h3>
            <p class="text-xs text-gray-400">Manage, edit, add and remove donation carousel cards shown on the landing page.</p>
          </div>
          <button @click="showAddCampaignModal = true" class="px-4 py-2 bg-[#C5A059] text-[#061916] text-xs font-bold rounded-lg flex items-center gap-1.5 hover:bg-[#E5C483] cursor-pointer self-start">
            <v-icon size="16">mdi-plus</v-icon>
            <span>Add New Campaign Card</span>
          </button>
        </div>

        <!-- Campaigns Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="(campaign, index) in cms.donationCampaigns"
            :key="campaign.id"
            class="bg-[#041210] border border-white/10 rounded-2xl p-5 space-y-4 shadow-lg flex flex-col justify-between"
          >
            <div class="flex justify-between items-center border-b border-white/10 pb-3">
              <span class="px-2.5 py-1 rounded bg-[#C5A059]/20 text-[#E5C483] text-xs font-mono font-bold">Campaign Card #0{{ index + 1 }}</span>
              <button @click="cms.removeDonationCampaign(campaign.id)" class="text-xs text-red-400 hover:text-red-300 font-semibold flex items-center gap-1 cursor-pointer">
                <v-icon size="14">mdi-delete-outline</v-icon> Delete Card
              </button>
            </div>

            <!-- Campaign Image Picker -->
            <div class="bg-[#061916] p-3.5 rounded-xl border border-[#C5A059]/30 space-y-2">
              <label class="block text-[11px] font-bold text-[#E5C483] uppercase">Campaign Card Image</label>
              <div class="flex flex-col sm:flex-row items-center gap-2">
                <label class="px-3 py-2 bg-[#C5A059] text-[#061916] font-bold text-xs rounded cursor-pointer hover:bg-[#E5C483] flex items-center gap-1">
                  <v-icon size="14">mdi-upload</v-icon>
                  <span>Upload File</span>
                  <input type="file" accept="image/*" class="hidden" @change="e => onCampaignFileUpload(e, campaign.id)" />
                </label>
                <input v-model="campaign.image" placeholder="Or paste image URL / Base64..." class="flex-1 w-full bg-[#041210] border border-white/20 rounded p-2 text-xs text-white font-mono" />
              </div>
              <div v-if="campaign.image" class="h-32 w-full rounded-lg overflow-hidden border border-white/20 mt-2">
                <img :src="campaign.image" alt="Preview" class="w-full h-full object-cover" />
              </div>
            </div>

            <!-- Titles & Category -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label class="block text-gray-400 mb-1 font-semibold">Title (EN)</label>
                <input v-model="campaign.titleEn" class="w-full bg-[#061916] border border-white/20 rounded p-2.5 text-white font-medium" />
              </div>
              <div>
                <label class="block text-gray-400 mb-1 font-semibold">Title (AR)</label>
                <input v-model="campaign.titleAr" class="w-full bg-[#061916] border border-white/20 rounded p-2.5 text-white text-right font-medium" />
              </div>

              <div>
                <label class="block text-gray-400 mb-1">Category Tag (EN)</label>
                <input v-model="campaign.categoryEn" class="w-full bg-[#061916] border border-white/20 rounded p-2 text-white" />
              </div>
              <div>
                <label class="block text-gray-400 mb-1">Category Tag (AR)</label>
                <input v-model="campaign.categoryAr" class="w-full bg-[#061916] border border-white/20 rounded p-2 text-white text-right" />
              </div>

              <div class="sm:col-span-2">
                <label class="block text-gray-400 mb-1">Caption / Description (EN)</label>
                <textarea v-model="campaign.captionEn" rows="2" class="w-full bg-[#061916] border border-white/20 rounded p-2 text-white"></textarea>
              </div>
              <div class="sm:col-span-2">
                <label class="block text-gray-400 mb-1">Caption / Description (AR)</label>
                <textarea v-model="campaign.captionAr" rows="2" class="w-full bg-[#061916] border border-white/20 rounded p-2 text-white text-right"></textarea>
              </div>

              <div>
                <label class="block text-gray-400 mb-1">Target Amount (Optional)</label>
                <input v-model="campaign.targetAmount" placeholder="$100,000" class="w-full bg-[#061916] border border-white/20 rounded p-2 text-white font-mono" />
              </div>
              <div>
                <label class="block text-gray-400 mb-1">Raised Amount (Optional)</label>
                <input v-model="campaign.raisedAmount" placeholder="$65,000" class="w-full bg-[#061916] border border-white/20 rounded p-2 text-white font-mono" />
              </div>

              <div class="sm:col-span-2">
                <label class="block text-gray-400 mb-1">Direct Custom Donate URL (Optional)</label>
                <input v-model="campaign.customDonateUrl" placeholder="https://al-khoei.org/donate/..." class="w-full bg-[#061916] border border-white/20 rounded p-2 text-white font-mono" />
              </div>
            </div>

          </div>
        </div>

        <button @click="showToast('Donation campaigns saved successfully!')" class="px-6 py-2.5 bg-[#C5A059] text-[#061916] font-bold text-xs rounded-lg hover:bg-[#E5C483] cursor-pointer">
          Save All Campaigns Changes
        </button>
      </div>

      <!-- Tab Content 1: Header Navigation Links -->
      <div v-if="activeTab === 'nav'" class="bg-[#061916] border border-[#C5A059]/30 rounded-2xl p-6 space-y-6 shadow-xl">
        <div class="flex justify-between items-center border-b border-white/10 pb-4">
          <div>
            <h3 class="text-base font-bold font-serif text-white">Header Navigation Links</h3>
            <p class="text-xs text-gray-400">Add, edit, or remove menu links shown in the top navigation bar.</p>
          </div>
          <button @click="showAddNavModal = true" class="px-4 py-2 bg-[#C5A059] text-[#061916] text-xs font-bold rounded-lg flex items-center gap-1.5 hover:bg-[#E5C483] cursor-pointer">
            <v-icon size="16">mdi-plus</v-icon>
            <span>Add Link</span>
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="nav in cms.navLinks" :key="nav.id" class="bg-[#041210] border border-white/10 rounded-xl p-4 flex flex-col justify-between gap-3">
            <div>
              <span class="text-[10px] font-mono text-[#C5A059] uppercase tracking-wider block mb-1">Key: {{ nav.key }}</span>
              <h4 class="text-sm font-bold text-white">{{ nav.labelEn }} / {{ nav.labelAr }}</h4>
              <p class="text-xs font-mono text-gray-400 mt-1">{{ nav.link }}</p>
            </div>
            <div class="flex justify-end gap-2 pt-2 border-t border-white/10">
              <button @click="cms.removeNavLink(nav.id)" class="text-xs text-red-400 hover:text-red-300 font-semibold flex items-center gap-1 cursor-pointer">
                <v-icon size="14">mdi-delete-outline</v-icon> Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab Content 2: Hero Carousel & Background Image Manager -->
      <div v-if="activeTab === 'hero'" class="bg-[#061916] border border-[#C5A059]/30 rounded-2xl p-6 space-y-6 shadow-xl">
        <div class="flex justify-between items-center border-b border-white/10 pb-4">
          <div>
            <h3 class="text-base font-bold font-serif text-white">Hero Image Carousel (معرض صور الهيرو)</h3>
            <p class="text-xs text-gray-400">Manage, upload and add high-resolution background images for the Hero carousel.</p>
          </div>
          <button @click="showAddSlideModal = true" class="px-4 py-2 bg-[#C5A059] text-[#061916] text-xs font-bold rounded-lg flex items-center gap-1.5 hover:bg-[#E5C483] cursor-pointer">
            <v-icon size="16">mdi-image-plus</v-icon>
            <span>Add New Image Slide</span>
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div v-for="(slide, index) in cms.heroSlides" :key="slide.id" class="bg-[#041210] border border-white/10 rounded-2xl p-4 flex flex-col justify-between gap-4 shadow-lg hover:border-[#C5A059]/50 transition-all">
            <div class="flex justify-between items-center">
              <span class="px-2.5 py-1 rounded bg-[#C5A059]/20 text-[#E5C483] text-xs font-mono font-bold">Image #0{{ index + 1 }}</span>
              <button @click="cms.removeHeroSlide(slide.id)" class="text-xs text-red-400 hover:text-red-300 font-semibold flex items-center gap-1 cursor-pointer">
                <v-icon size="14">mdi-delete-outline</v-icon> Delete
              </button>
            </div>

            <!-- Image Preview Box -->
            <div class="relative h-44 w-full rounded-xl overflow-hidden border border-white/15 bg-black">
              <img :src="slide.bgImage" alt="Slide Image Preview" class="w-full h-full object-cover" />
              <span class="absolute bottom-2 right-2 bg-black/80 text-white text-[9px] px-2 py-0.5 rounded font-mono">Active</span>
            </div>

            <!-- Upload Controls -->
            <div class="space-y-2">
              <label class="w-full py-2 bg-[#C5A059] text-[#061916] font-bold text-xs rounded-lg cursor-pointer hover:bg-[#E5C483] flex items-center justify-center gap-1.5 transition-all">
                <v-icon size="16">mdi-upload</v-icon>
                <span>Upload New File</span>
                <input type="file" accept="image/*" class="hidden" @change="e => onSlideFileUpload(e, slide.id)" />
              </label>

              <input
                v-model="slide.bgImage"
                placeholder="Or paste image URL / Base64..."
                class="w-full bg-[#061916] border border-white/20 rounded-lg p-2 text-[11px] text-white font-mono"
              />
            </div>
          </div>
        </div>

        <button @click="showToast('Hero Carousel images saved successfully!')" class="px-6 py-2.5 bg-[#C5A059] text-[#061916] font-bold text-xs rounded-lg hover:bg-[#E5C483] cursor-pointer">
          Save Hero Changes
        </button>
      </div>

      <!-- Tab Content: Live Broadcast Stream Manager -->
      <div v-if="activeTab === 'stream'" class="bg-[#061916] border border-[#C5A059]/30 rounded-2xl p-6 space-y-6 shadow-xl max-w-3xl">
        <div class="border-b border-white/10 pb-4">
          <h3 class="text-base font-bold font-serif text-white">Live Broadcast Stream Settings</h3>
          <p class="text-xs text-gray-400">Control live video stream URLs, cover images, titles, and live badges.</p>
        </div>

        <div class="space-y-4 text-xs">
          <!-- Cover Image Upload -->
          <div class="bg-[#041210] p-4 rounded-xl border border-white/10 space-y-3">
            <label class="block text-xs font-bold text-[#E5C483] uppercase">Stream Cover Image (Upload File or URL)</label>
            <div class="flex flex-col sm:flex-row items-center gap-3">
              <label class="px-4 py-2 bg-[#C5A059] text-[#061916] font-bold rounded cursor-pointer hover:bg-[#E5C483] flex items-center gap-1.5">
                <v-icon size="16">mdi-upload</v-icon>
                <span>Upload Cover Image</span>
                <input type="file" accept="image/*" class="hidden" @change="onStreamCoverFileUpload" />
              </label>
              <input v-model="cms.streamSettings.coverImage" placeholder="Or Image URL / Data Base64..." class="flex-1 w-full bg-[#061916] border border-white/20 rounded p-2.5 text-white font-mono" />
            </div>

            <div v-if="cms.streamSettings.coverImage" class="h-28 w-48 rounded-lg overflow-hidden border border-white/20 mt-2">
              <img :src="cms.streamSettings.coverImage" alt="Stream Cover Preview" class="w-full h-full object-cover" />
            </div>
          </div>

          <!-- Video Stream URL & Channel URL -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-[#EF4444] font-bold mb-1 flex items-center gap-1.5">
                <v-icon size="16" color="#EF4444">mdi-youtube</v-icon>
                <span>Live Video Stream URL (YouTube Video Link)</span>
              </label>
              <input v-model="cms.streamSettings.streamUrl" placeholder="https://www.youtube.com/watch?v=..." class="w-full bg-[#041210] border border-white/20 rounded p-3 text-white font-mono" />
            </div>

            <div>
              <label class="block text-gray-300 font-bold mb-1 flex items-center gap-1.5">
                <v-icon size="16" color="#C5A059">mdi-play-box-multiple-outline</v-icon>
                <span>Official YouTube Channel URL</span>
              </label>
              <input v-model="cms.streamSettings.channelUrl" placeholder="https://youtube.com/@alkhoeifoundation" class="w-full bg-[#041210] border border-white/20 rounded p-3 text-white font-mono" />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-300 font-bold mb-1">Stream Title (EN)</label>
              <input v-model="cms.streamSettings.titleEn" class="w-full bg-[#041210] border border-white/20 rounded p-2.5 text-white" />
            </div>
            <div>
              <label class="block text-gray-300 font-bold mb-1">Stream Title (AR)</label>
              <input v-model="cms.streamSettings.titleAr" class="w-full bg-[#041210] border border-white/20 rounded p-2.5 text-white text-right" />
            </div>

            <div>
              <label class="block text-gray-300 font-bold mb-1">Subtitle (EN)</label>
              <input v-model="cms.streamSettings.subtitleEn" class="w-full bg-[#041210] border border-white/20 rounded p-2.5 text-white" />
            </div>
            <div>
              <label class="block text-gray-300 font-bold mb-1">Subtitle (AR)</label>
              <input v-model="cms.streamSettings.subtitleAr" class="w-full bg-[#041210] border border-white/20 rounded p-2.5 text-white text-right" />
            </div>

            <div class="md:col-span-2">
              <label class="block text-gray-300 font-bold mb-1">Caption / Description (EN)</label>
              <textarea v-model="cms.streamSettings.captionEn" rows="2" class="w-full bg-[#041210] border border-white/20 rounded p-2.5 text-white"></textarea>
            </div>
            <div class="md:col-span-2">
              <label class="block text-gray-300 font-bold mb-1">Caption / Description (AR)</label>
              <textarea v-model="cms.streamSettings.captionAr" rows="2" class="w-full bg-[#041210] border border-white/20 rounded p-2.5 text-white text-right"></textarea>
            </div>

            <div>
              <label class="block text-gray-300 font-bold mb-1">Broadcast Studio Location (EN)</label>
              <input v-model="cms.streamSettings.locationEn" placeholder="Najaf Al-Ashraf & London" class="w-full bg-[#041210] border border-white/20 rounded p-2.5 text-white" />
            </div>
            <div>
              <label class="block text-gray-300 font-bold mb-1">Broadcast Studio Location (AR)</label>
              <input v-model="cms.streamSettings.locationAr" placeholder="النجف الأشرف ولندن" class="w-full bg-[#041210] border border-white/20 rounded p-2.5 text-white text-right" />
            </div>

            <div>
              <label class="block text-gray-300 font-bold mb-1">Viewers Counter (e.g. 3,850+)</label>
              <input v-model="cms.streamSettings.viewersCount" class="w-full bg-[#041210] border border-white/20 rounded p-2.5 text-white font-mono" />
            </div>

            <div class="flex items-center gap-3 pt-6">
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="cms.streamSettings.isLiveNow" class="sr-only peer" />
                <div class="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                <span class="ml-3 text-xs font-bold text-white uppercase">Is Stream Live Right Now? (مباشر الآن)</span>
              </label>
            </div>
          </div>

          <button @click="showToast('Live stream settings updated successfully!')" class="px-6 py-2.5 bg-[#C5A059] text-[#061916] font-bold text-xs rounded-lg hover:bg-[#E5C483] cursor-pointer">
            Save Stream Settings
          </button>
        </div>
      </div>

      <!-- Tab Content: Donation & Payment Link Settings -->
      <div v-if="activeTab === 'donate'" class="bg-[#061916] border border-[#C5A059]/30 rounded-2xl p-6 space-y-6 shadow-xl max-w-3xl">
        <div class="border-b border-white/10 pb-4">
          <h3 class="text-base font-bold font-serif text-white">Donation & Payment Link Settings</h3>
          <p class="text-xs text-gray-400">Manage direct checkout URLs, payment banners, and bank transfer details.</p>
        </div>

        <div class="space-y-4 text-xs">
          <!-- Banner Image Upload -->
          <div class="bg-[#041210] p-4 rounded-xl border border-white/10 space-y-3">
            <label class="block text-xs font-bold text-[#E5C483] uppercase">Donation Banner Image (Upload File or URL)</label>
            <div class="flex flex-col sm:flex-row items-center gap-3">
              <label class="px-4 py-2 bg-[#C5A059] text-[#061916] font-bold rounded cursor-pointer hover:bg-[#E5C483] flex items-center gap-1.5">
                <v-icon size="16">mdi-upload</v-icon>
                <span>Upload Banner Image</span>
                <input type="file" accept="image/*" class="hidden" @change="onDonationBannerFileUpload" />
              </label>
              <input v-model="cms.donationSettings.bannerImage" placeholder="Or Image URL / Data Base64..." class="flex-1 w-full bg-[#061916] border border-white/20 rounded p-2.5 text-white font-mono" />
            </div>
          </div>

          <!-- Direct Payment Portal URL -->
          <div>
            <label class="block text-[#C5A059] font-bold mb-1">Direct Checkout / Payment Portal URL (PayPal, Stripe, etc.)</label>
            <input v-model="cms.donationSettings.directPaymentUrl" placeholder="https://al-khoei.org/donate" class="w-full bg-[#041210] border border-white/20 rounded p-3 text-white font-mono" />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-300 font-bold mb-1">Title (EN)</label>
              <input v-model="cms.donationSettings.titleEn" class="w-full bg-[#041210] border border-white/20 rounded p-2.5 text-white" />
            </div>
            <div>
              <label class="block text-gray-300 font-bold mb-1">Title (AR)</label>
              <input v-model="cms.donationSettings.titleAr" class="w-full bg-[#041210] border border-white/20 rounded p-2.5 text-white text-right" />
            </div>

            <div class="md:col-span-2">
              <label class="block text-gray-300 font-bold mb-1">Bank Transfer Details (EN)</label>
              <textarea v-model="cms.donationSettings.bankDetailsEn" rows="2" class="w-full bg-[#041210] border border-white/20 rounded p-2.5 text-white font-mono"></textarea>
            </div>
            <div class="md:col-span-2">
              <label class="block text-gray-300 font-bold mb-1">Bank Transfer Details (AR)</label>
              <textarea v-model="cms.donationSettings.bankDetailsAr" rows="2" class="w-full bg-[#041210] border border-white/20 rounded p-2.5 text-white text-right font-mono"></textarea>
            </div>
          </div>

          <button @click="showToast('Donation settings updated successfully!')" class="px-6 py-2.5 bg-[#C5A059] text-[#061916] font-bold text-xs rounded-lg hover:bg-[#E5C483] cursor-pointer">
            Save Donation Settings
          </button>
        </div>
      </div>

      <!-- Tab Content: Fatwa & Questions Link Settings -->
      <div v-if="activeTab === 'fatwas'" class="bg-[#061916] border border-[#C5A059]/30 rounded-2xl p-6 space-y-6 shadow-xl max-w-3xl">
        <div class="border-b border-white/10 pb-4">
          <h3 class="text-base font-bold font-serif text-white">Fatwa & Religious Questions Target Link</h3>
          <p class="text-xs text-gray-400">Set the custom external or page link opened when users click 'Ask a Question' or 'Fatwas'.</p>
        </div>

        <div class="space-y-4 text-xs">
          <div>
            <label class="block text-[#C5A059] font-bold mb-1">Custom Fatwa / Questions Destination URL</label>
            <input v-model="cms.fatwaSettings.fatwaUrl" placeholder="https://al-khoei.org/fatwas" class="w-full bg-[#041210] border border-white/20 rounded p-3 text-white font-mono" />
            <p class="text-[10px] text-gray-400 mt-1">Users clicking 'Ask a Question' or 'Fatwas' will immediately open this link.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-300 font-bold mb-1">Title (EN)</label>
              <input v-model="cms.fatwaSettings.titleEn" class="w-full bg-[#041210] border border-white/20 rounded p-2.5 text-white" />
            </div>
            <div>
              <label class="block text-gray-300 font-bold mb-1">Title (AR)</label>
              <input v-model="cms.fatwaSettings.titleAr" class="w-full bg-[#041210] border border-white/20 rounded p-2.5 text-white text-right" />
            </div>
          </div>

          <button @click="showToast('Fatwa & Questions link updated successfully!')" class="px-6 py-2.5 bg-[#C5A059] text-[#061916] font-bold text-xs rounded-lg hover:bg-[#E5C483] cursor-pointer">
            Save Fatwa Link Settings
          </button>
        </div>
      </div>

      <!-- Tab Content: Social Media Links -->
      <div v-if="activeTab === 'social'" class="bg-[#061916] border border-[#C5A059]/30 rounded-2xl p-6 space-y-6 shadow-xl max-w-3xl">
        <div class="border-b border-white/10 pb-4">
          <h3 class="text-base font-bold font-serif text-white">Social Media Account Links</h3>
          <p class="text-xs text-gray-400">Update official social media URLs displayed in the hero section bottom bar and footer.</p>
        </div>

        <div class="space-y-4 text-xs">
          <div>
            <label class="block text-gray-300 font-bold mb-1 flex items-center gap-2">
              <v-icon size="16" color="#C5A059">mdi-facebook</v-icon>
              <span>Facebook Page URL</span>
            </label>
            <input v-model="cms.socialLinks.facebook" placeholder="https://facebook.com/your-page" class="w-full bg-[#041210] border border-white/20 rounded p-3 text-white font-mono" />
          </div>

          <div>
            <label class="block text-gray-300 font-bold mb-1 flex items-center gap-2">
              <v-icon size="16" color="#C5A059">mdi-youtube</v-icon>
              <span>YouTube Channel URL</span>
            </label>
            <input v-model="cms.socialLinks.youtube" placeholder="https://youtube.com/your-channel" class="w-full bg-[#041210] border border-white/20 rounded p-3 text-white font-mono" />
          </div>

          <div>
            <label class="block text-gray-300 font-bold mb-1 flex items-center gap-2">
              <v-icon size="16" color="#C5A059">mdi-instagram</v-icon>
              <span>Instagram Profile URL</span>
            </label>
            <input v-model="cms.socialLinks.instagram" placeholder="https://instagram.com/your-profile" class="w-full bg-[#041210] border border-white/20 rounded p-3 text-white font-mono" />
          </div>

          <div>
            <label class="block text-gray-300 font-bold mb-1 flex items-center gap-2">
              <v-icon size="16" color="#C5A059">mdi-twitter</v-icon>
              <span>Twitter / X Profile URL</span>
            </label>
            <input v-model="cms.socialLinks.twitter" placeholder="https://twitter.com/your-handle" class="w-full bg-[#041210] border border-white/20 rounded p-3 text-white font-mono" />
          </div>

          <div>
            <label class="block text-gray-300 font-bold mb-1 flex items-center gap-2">
              <v-icon size="16" color="#C5A059">mdi-paper-plane</v-icon>
              <span>Telegram Channel URL</span>
            </label>
            <input v-model="cms.socialLinks.telegram" placeholder="https://t.me/your-channel" class="w-full bg-[#041210] border border-white/20 rounded p-3 text-white font-mono" />
          </div>

          <button @click="showToast('Social media links updated successfully!')" class="px-6 py-2.5 bg-[#C5A059] text-[#061916] font-bold text-xs rounded-lg hover:bg-[#E5C483] cursor-pointer">
            Save Social Media Links
          </button>
        </div>
      </div>

      <!-- Tab Content 3: Prayer Times Manager -->
      <div v-if="activeTab === 'prayers'" class="bg-[#061916] border border-[#C5A059]/30 rounded-2xl p-6 space-y-6 shadow-xl">
        <div class="border-b border-white/10 pb-4">
          <h3 class="text-base font-bold font-serif text-white">Prayer Times Settings</h3>
          <p class="text-xs text-gray-400">Update calculation method, location text, and core prayer times.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label class="block text-gray-400 mb-1">Location Subtitle (EN)</label>
            <input v-model="cms.prayerTimes.locationEn" class="w-full bg-[#041210] border border-white/20 rounded p-2.5 text-white" />
          </div>
          <div>
            <label class="block text-gray-400 mb-1">Location Subtitle (AR)</label>
            <input v-model="cms.prayerTimes.locationAr" class="w-full bg-[#041210] border border-white/20 rounded p-2.5 text-white text-right" />
          </div>

          <div>
            <label class="block text-[#C5A059] font-bold mb-1">Fajr Time</label>
            <input v-model="cms.prayerTimes.fajr" class="w-full bg-[#041210] border border-white/20 rounded p-2.5 text-white font-mono" />
          </div>
          <div>
            <label class="block text-[#C5A059] font-bold mb-1">Sunrise Time</label>
            <input v-model="cms.prayerTimes.sunrise" class="w-full bg-[#041210] border border-white/20 rounded p-2.5 text-white font-mono" />
          </div>
          <div>
            <label class="block text-[#C5A059] font-bold mb-1">Dhuhrain Time</label>
            <input v-model="cms.prayerTimes.dhuhrain" class="w-full bg-[#041210] border border-white/20 rounded p-2.5 text-white font-mono" />
          </div>
          <div>
            <label class="block text-[#C5A059] font-bold mb-1">Maghribayn Time</label>
            <input v-model="cms.prayerTimes.maghribayn" class="w-full bg-[#041210] border border-white/20 rounded p-2.5 text-white font-mono" />
          </div>
        </div>

        <button @click="showToast('Prayer times updated successfully!')" class="px-6 py-2.5 bg-[#C5A059] text-[#061916] font-bold text-xs rounded-lg hover:bg-[#E5C483] cursor-pointer">
          Save Prayer Times
        </button>
      </div>

      <!-- Tab Content 4: News & Announcements CMS -->
      <div v-if="activeTab === 'news'" class="bg-[#061916] border border-[#C5A059]/30 rounded-2xl p-6 space-y-6 shadow-xl">
        <div class="flex justify-between items-center border-b border-white/10 pb-4">
          <div>
            <h3 class="text-base font-bold font-serif text-white">News & Announcements CMS</h3>
            <p class="text-xs text-gray-400">Add, edit, or remove news cards displayed on the landing page.</p>
          </div>
          <button @click="showAddNewsModal = true" class="px-4 py-2 bg-[#C5A059] text-[#061916] text-xs font-bold rounded-lg flex items-center gap-1.5 hover:bg-[#E5C483] cursor-pointer">
            <v-icon size="16">mdi-plus</v-icon>
            <span>Add News Card</span>
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="news in cms.newsList" :key="news.id" class="bg-[#041210] border border-white/10 rounded-xl p-4 space-y-3">
            <div class="flex justify-between items-start">
              <span class="text-[10px] font-bold text-[#C5A059] uppercase tracking-wider">{{ news.month }} {{ news.day }} • {{ news.category }}</span>
              <button @click="cms.removeNewsItem(news.id)" class="text-xs text-red-400 hover:text-red-300 font-semibold flex items-center gap-1 cursor-pointer">
                <v-icon size="14">mdi-delete-outline</v-icon> Delete
              </button>
            </div>
            <h4 class="text-sm font-bold text-white">{{ news.titleEn }}</h4>
            <p class="text-xs text-gray-400 line-clamp-2">{{ news.summaryEn }}</p>
          </div>
        </div>
      </div>

      <!-- Tab Content 5: Security & Passcode Change -->
      <div v-if="activeTab === 'security'" class="bg-[#061916] border border-[#C5A059]/30 rounded-2xl p-6 space-y-6 shadow-xl max-w-lg">
        <div class="border-b border-white/10 pb-4">
          <h3 class="text-base font-bold font-serif text-white">Admin Security Settings</h3>
          <p class="text-xs text-gray-400">Change your secret PIN passcode to secure the panel.</p>
        </div>

        <div class="space-y-4 text-xs">
          <div>
            <label class="block text-[#C5A059] font-bold mb-1">New Passcode PIN</label>
            <input v-model="newPin" type="password" placeholder="Enter new passcode..." class="w-full bg-[#041210] border border-white/20 rounded p-3 text-white font-mono" />
          </div>

          <button @click="onChangePin" class="px-6 py-2.5 bg-[#C5A059] text-[#061916] font-bold text-xs rounded-lg hover:bg-[#E5C483] cursor-pointer">
            Update Admin PIN
          </button>
        </div>
      </div>

    </div>

    <!-- Modal: Add Nav Link -->
    <v-dialog v-model="showAddNavModal" max-width="500">
      <div class="bg-[#061916] border border-[#C5A059]/40 rounded-2xl p-6 text-white space-y-4">
        <h4 class="text-base font-bold font-serif text-[#E5C483]">Add New Header Link</h4>
        <div class="space-y-3 text-xs">
          <input v-model="newNav.key" placeholder="Key (e.g. fatwas)" class="w-full bg-[#041210] border border-white/20 rounded p-2.5 text-white" />
          <input v-model="newNav.labelEn" placeholder="Label (EN)" class="w-full bg-[#041210] border border-white/20 rounded p-2.5 text-white" />
          <input v-model="newNav.labelAr" placeholder="Label (AR)" class="w-full bg-[#041210] border border-white/20 rounded p-2.5 text-white text-right" />
          <input v-model="newNav.link" placeholder="Anchor / URL (e.g. #fatwas)" class="w-full bg-[#041210] border border-white/20 rounded p-2.5 text-white" />
        </div>
        <div class="flex justify-end gap-2 pt-2">
          <button @click="showAddNavModal = false" class="px-4 py-2 bg-gray-700 text-white rounded text-xs cursor-pointer">Cancel</button>
          <button @click="onSaveNav" class="px-4 py-2 bg-[#C5A059] text-[#061916] font-bold rounded text-xs cursor-pointer">Save Link</button>
        </div>
      </div>
    </v-dialog>

    <!-- Modal: Add Hero Image Slide -->
    <v-dialog v-model="showAddSlideModal" max-width="500">
      <div class="bg-[#061916] border border-[#C5A059]/40 rounded-2xl p-6 text-white space-y-4">
        <h4 class="text-base font-bold font-serif text-[#E5C483]">Add New Hero Image (إضافة صورة جديدة للهيرو)</h4>
        <div class="space-y-4 text-xs">
          
          <!-- Modal Image File Upload -->
          <div class="bg-[#041210] p-4 rounded-xl border border-[#C5A059]/30 space-y-3">
            <label class="block text-xs font-bold text-[#E5C483] uppercase">Upload Image from Device</label>
            <div class="flex items-center gap-2">
              <label class="px-4 py-2.5 bg-[#C5A059] text-[#061916] font-bold text-xs rounded cursor-pointer hover:bg-[#E5C483] flex items-center gap-1.5 shadow-md">
                <v-icon size="16">mdi-upload</v-icon>
                <span>Upload File</span>
                <input type="file" accept="image/*" class="hidden" @change="onNewSlideFileUpload" />
              </label>
              <input v-model="newSlide.bgImage" placeholder="Or paste image URL / Base64..." class="flex-1 bg-[#061916] border border-white/20 rounded p-2.5 text-xs text-white font-mono" />
            </div>

            <!-- Preview in Modal -->
            <div v-if="newSlide.bgImage" class="relative h-40 w-full rounded-lg overflow-hidden border border-white/20 mt-2">
              <img :src="newSlide.bgImage" alt="Preview" class="w-full h-full object-cover" />
            </div>
          </div>

        </div>
        <div class="flex justify-end gap-2 pt-2 border-t border-white/10">
          <button @click="showAddSlideModal = false" class="px-4 py-2 bg-gray-700 text-white rounded text-xs cursor-pointer">Cancel</button>
          <button @click="onSaveSlide" class="px-4 py-2 bg-[#C5A059] text-[#061916] font-bold rounded text-xs cursor-pointer hover:bg-[#E5C483]">Add Image Slide</button>
        </div>
      </div>
    </v-dialog>

    <!-- Modal: Add Donation Campaign Card (NEW) -->
    <v-dialog v-model="showAddCampaignModal" max-width="650">
      <div class="bg-[#061916] border border-[#C5A059]/40 rounded-3xl p-6 text-white space-y-4 shadow-2xl">
        <div class="flex justify-between items-center border-b border-white/10 pb-3">
          <h4 class="text-base font-bold font-serif text-[#E5C483] flex items-center gap-2">
            <v-icon color="#C5A059">mdi-hand-heart</v-icon>
            <span>Add New Donation Campaign Card</span>
          </h4>
          <button @click="showAddCampaignModal = false" class="text-gray-400 hover:text-white cursor-pointer"><v-icon size="18">mdi-close</v-icon></button>
        </div>

        <div class="space-y-4 text-xs">
          
          <!-- Image Upload Box -->
          <div class="bg-[#041210] p-4 rounded-xl border border-[#C5A059]/30 space-y-2">
            <label class="block text-xs font-bold text-[#E5C483] uppercase">Campaign Card Image</label>
            <div class="flex items-center gap-2">
              <label class="px-3 py-2 bg-[#C5A059] text-[#061916] font-bold text-xs rounded cursor-pointer hover:bg-[#E5C483] flex items-center gap-1">
                <v-icon size="14">mdi-upload</v-icon>
                <span>Upload File</span>
                <input type="file" accept="image/*" class="hidden" @change="onNewCampaignFileUpload" />
              </label>
              <input v-model="newCampaign.image" placeholder="Or paste image URL / Base64..." class="flex-1 bg-[#061916] border border-white/20 rounded p-2 text-xs text-white font-mono" />
            </div>

            <div v-if="newCampaign.image" class="h-32 w-full rounded-lg overflow-hidden border border-white/20 mt-2">
              <img :src="newCampaign.image" alt="Preview" class="w-full h-full object-cover" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-gray-300 font-bold mb-1">Title (EN)</label>
              <input v-model="newCampaign.titleEn" placeholder="e.g. Orphans Sponsorship" class="w-full bg-[#041210] border border-white/20 rounded p-2.5 text-white" />
            </div>
            <div>
              <label class="block text-gray-300 font-bold mb-1">Title (AR)</label>
              <input v-model="newCampaign.titleAr" placeholder="مثال: كفالة ورعاية الأيتام" class="w-full bg-[#041210] border border-white/20 rounded p-2.5 text-white text-right" />
            </div>

            <div>
              <label class="block text-gray-300 font-bold mb-1">Category Tag (EN)</label>
              <input v-model="newCampaign.categoryEn" placeholder="ORPHAN CARE" class="w-full bg-[#041210] border border-white/20 rounded p-2.5 text-white" />
            </div>
            <div>
              <label class="block text-gray-300 font-bold mb-1">Category Tag (AR)</label>
              <input v-model="newCampaign.categoryAr" placeholder="رعاية الأيتام" class="w-full bg-[#041210] border border-white/20 rounded p-2.5 text-white text-right" />
            </div>

            <div class="sm:col-span-2">
              <label class="block text-gray-300 font-bold mb-1">Caption / Description (EN)</label>
              <textarea v-model="newCampaign.captionEn" rows="2" placeholder="Brief description of the cause..." class="w-full bg-[#041210] border border-white/20 rounded p-2 text-white"></textarea>
            </div>
            <div class="sm:col-span-2">
              <label class="block text-gray-300 font-bold mb-1">Caption / Description (AR)</label>
              <textarea v-model="newCampaign.captionAr" rows="2" placeholder="وصف موجز للمشروع وأثره..." class="w-full bg-[#041210] border border-white/20 rounded p-2 text-white text-right"></textarea>
            </div>

            <div>
              <label class="block text-gray-300 font-bold mb-1">Target Amount (Optional)</label>
              <input v-model="newCampaign.targetAmount" placeholder="$100,000" class="w-full bg-[#041210] border border-white/20 rounded p-2 text-white font-mono" />
            </div>
            <div>
              <label class="block text-gray-300 font-bold mb-1">Raised Amount (Optional)</label>
              <input v-model="newCampaign.raisedAmount" placeholder="$65,000" class="w-full bg-[#041210] border border-white/20 rounded p-2 text-white font-mono" />
            </div>

            <div class="sm:col-span-2">
              <label class="block text-gray-300 font-bold mb-1">Direct Custom Donate URL (Optional)</label>
              <input v-model="newCampaign.customDonateUrl" placeholder="https://al-khoei.org/donate/..." class="w-full bg-[#041210] border border-white/20 rounded p-2 text-white font-mono" />
            </div>
          </div>

        </div>

        <div class="flex justify-end gap-2 pt-3 border-t border-white/10">
          <button @click="showAddCampaignModal = false" class="px-4 py-2 bg-gray-700 text-white rounded text-xs cursor-pointer">Cancel</button>
          <button @click="onSaveCampaign" class="px-5 py-2 bg-[#C5A059] text-[#061916] font-bold rounded text-xs cursor-pointer hover:bg-[#E5C483]">Save Campaign Card</button>
        </div>
      </div>
    </v-dialog>

    <!-- Modal: Add News Item -->
    <v-dialog v-model="showAddNewsModal" max-width="600">
      <div class="bg-[#061916] border border-[#C5A059]/40 rounded-2xl p-6 text-white space-y-4">
        <h4 class="text-base font-bold font-serif text-[#E5C483]">Add News Card</h4>
        <div class="space-y-3 text-xs">
          <div class="grid grid-cols-3 gap-2">
            <input v-model="newNews.month" placeholder="Month (MAY)" class="bg-[#041210] border border-white/20 rounded p-2.5 text-white" />
            <input v-model="newNews.day" placeholder="Day (28)" class="bg-[#041210] border border-white/20 rounded p-2.5 text-white" />
            <input v-model="newNews.category" placeholder="Category" class="bg-[#041210] border border-white/20 rounded p-2.5 text-white" />
          </div>
          <input v-model="newNews.titleEn" placeholder="Title (EN)" class="w-full bg-[#041210] border border-white/20 rounded p-2.5 text-white" />
          <input v-model="newNews.titleAr" placeholder="Title (AR)" class="w-full bg-[#041210] border border-white/20 rounded p-2.5 text-white text-right" />
          <textarea v-model="newNews.summaryEn" placeholder="Summary (EN)" rows="2" class="w-full bg-[#041210] border border-white/20 rounded p-2.5 text-white"></textarea>
          <textarea v-model="newNews.summaryAr" placeholder="Summary (AR)" rows="2" class="w-full bg-[#041210] border border-white/20 rounded p-2.5 text-white text-right"></textarea>
        </div>
        <div class="flex justify-end gap-2 pt-2">
          <button @click="showAddNewsModal = false" class="px-4 py-2 bg-gray-700 text-white rounded text-xs cursor-pointer">Cancel</button>
          <button @click="onSaveNews" class="px-4 py-2 bg-[#C5A059] text-[#061916] font-bold rounded text-xs cursor-pointer">Save News Card</button>
        </div>
      </div>
    </v-dialog>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCmsStore } from '@/stores/cms'

const cms = useCmsStore()

const pinInput = ref('')
const showPin = ref(false)
const loginError = ref(false)
const toastMessage = ref('')

const activeTab = ref('branding')

const tabs = [
  { id: 'branding', label: 'Site Logo & Name', icon: 'mdi-earth-box-plus' },
  { id: 'campaigns', label: 'Donation Campaigns (أنواع التبرعات)', icon: 'mdi-hand-heart' },
  { id: 'hero', label: 'Hero Image Carousel', icon: 'mdi-view-carousel-outline' },
  { id: 'nav', label: 'Header Nav Links', icon: 'mdi-link-variant' },
  { id: 'stream', label: 'Live Broadcast Stream', icon: 'mdi-video-wireless-outline' },
  { id: 'donate', label: 'Donation Settings & Links', icon: 'mdi-hand-heart-outline' },
  { id: 'fatwas', label: 'Fatwas & Questions Link', icon: 'mdi-chat-question-outline' },
  { id: 'social', label: 'Social Media Links', icon: 'mdi-share-variant-outline' },
  { id: 'prayers', label: 'Prayer Times', icon: 'mdi-clock-time-four-outline' },
  { id: 'news', label: 'News & Announcements', icon: 'mdi-newspaper-variant-outline' },
  { id: 'security', label: 'Admin Security PIN', icon: 'mdi-shield-lock-outline' },
]

function onLogin() {
  if (cms.login(pinInput.value)) {
    loginError.value = false
    pinInput.value = ''
    showToast('Welcome to Al-Khoei Admin Control Panel!')
  } else {
    loginError.value = true
  }
}

function onLogout() {
  cms.logout()
  showToast('Logged out successfully.')
}

function showToast(msg: string) {
  toastMessage.value = msg
  setTimeout(() => {
    toastMessage.value = ''
  }, 4000)
}

function onLogoFileUpload(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        cms.siteSettings.logoImage = e.target.result as string
        showToast('Site logo image uploaded successfully!')
      }
    }
    reader.readAsDataURL(file)
  }
}

function onSlideFileUpload(event: Event, slideId: number) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        const slide = cms.heroSlides.find(s => s.id === slideId)
        if (slide) {
          slide.bgImage = e.target.result as string
          showToast('Image uploaded successfully for slide!')
        }
      }
    }
    reader.readAsDataURL(file)
  }
}

function onNewSlideFileUpload(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        newSlide.value.bgImage = e.target.result as string
        showToast('Image uploaded for new slide!')
      }
    }
    reader.readAsDataURL(file)
  }
}

// Donation Campaign File Uploads
function onCampaignFileUpload(event: Event, campaignId: number) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        const camp = cms.donationCampaigns.find(c => c.id === campaignId)
        if (camp) {
          camp.image = e.target.result as string
          showToast('Campaign image uploaded successfully!')
        }
      }
    }
    reader.readAsDataURL(file)
  }
}

function onNewCampaignFileUpload(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        newCampaign.value.image = e.target.result as string
        showToast('Image uploaded for campaign!')
      }
    }
    reader.readAsDataURL(file)
  }
}

function onStreamCoverFileUpload(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        cms.streamSettings.coverImage = e.target.result as string
        showToast('Stream cover image uploaded successfully!')
      }
    }
    reader.readAsDataURL(file)
  }
}

function onDonationBannerFileUpload(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        cms.donationSettings.bannerImage = e.target.result as string
        showToast('Donation banner image uploaded successfully!')
      }
    }
    reader.readAsDataURL(file)
  }
}

// Nav Modal State
const showAddNavModal = ref(false)
const newNav = ref({ key: '', labelEn: '', labelAr: '', link: '' })

function onSaveNav() {
  if (newNav.value.labelEn && newNav.value.link) {
    cms.addNavLink({
      key: newNav.value.key || 'link',
      labelEn: newNav.value.labelEn,
      labelAr: newNav.value.labelAr || newNav.value.labelEn,
      link: newNav.value.link,
    })
    newNav.value = { key: '', labelEn: '', labelAr: '', link: '' }
    showAddNavModal.value = false
    showToast('New Header Link added successfully!')
  }
}

// Hero Slide Modal State
const showAddSlideModal = ref(false)
const newSlide = ref({
  bgImage: '',
  badgeEn: '',
  badgeAr: '',
  taglineEn: '',
  taglineAr: '',
  subTaglineEn: '',
  subTaglineAr: '',
  descriptionEn: '',
  descriptionAr: '',
  primaryBtnEn: '',
  primaryBtnAr: '',
  secondaryBtnEn: '',
  secondaryBtnAr: '',
  primaryAction: '',
  secondaryAction: '',
  primaryBtnLink: '',
  secondaryBtnLink: '',
})

function onSaveSlide() {
  if (newSlide.value.bgImage) {
    cms.addHeroSlide({ ...newSlide.value })
    newSlide.value = {
      bgImage: '',
      badgeEn: '',
      badgeAr: '',
      taglineEn: '',
      taglineAr: '',
      subTaglineEn: '',
      subTaglineAr: '',
      descriptionEn: '',
      descriptionAr: '',
      primaryBtnEn: '',
      primaryBtnAr: '',
      secondaryBtnEn: '',
      secondaryBtnAr: '',
      primaryAction: '',
      secondaryAction: '',
      primaryBtnLink: '',
      secondaryBtnLink: '',
    }
    showAddSlideModal.value = false
    showToast('New Hero Image Slide added successfully!')
  } else {
    showToast('Please upload or enter an image URL first.')
  }
}

// Donation Campaign Modal State (NEW)
const showAddCampaignModal = ref(false)
const newCampaign = ref({
  titleEn: '',
  titleAr: '',
  categoryEn: 'RELIEF APPEAL',
  categoryAr: 'حملة إغاثة',
  captionEn: '',
  captionAr: '',
  image: '',
  targetAmount: '',
  raisedAmount: '',
  customDonateUrl: '',
})

function onSaveCampaign() {
  if (newCampaign.value.titleEn || newCampaign.value.titleAr) {
    cms.addDonationCampaign({
      titleEn: newCampaign.value.titleEn || newCampaign.value.titleAr,
      titleAr: newCampaign.value.titleAr || newCampaign.value.titleEn,
      categoryEn: newCampaign.value.categoryEn || 'RELIEF APPEAL',
      categoryAr: newCampaign.value.categoryAr || 'حملة إغاثة',
      captionEn: newCampaign.value.captionEn || '',
      captionAr: newCampaign.value.captionAr || '',
      image: newCampaign.value.image,
      targetAmount: newCampaign.value.targetAmount,
      raisedAmount: newCampaign.value.raisedAmount,
      customDonateUrl: newCampaign.value.customDonateUrl,
    })
    newCampaign.value = {
      titleEn: '',
      titleAr: '',
      categoryEn: 'RELIEF APPEAL',
      categoryAr: 'حملة إغاثة',
      captionEn: '',
      captionAr: '',
      image: '',
      targetAmount: '',
      raisedAmount: '',
      customDonateUrl: '',
    }
    showAddCampaignModal.value = false
    showToast('New Donation Campaign Card added successfully!')
  } else {
    showToast('Please enter a campaign title.')
  }
}

// News Modal State
const showAddNewsModal = ref(false)
const newNews = ref({
  month: 'MAY',
  day: '30',
  category: 'ANNOUNCEMENT',
  subtitle: 'ANNOUNCEMENT',
  titleEn: '',
  titleAr: '',
  summaryEn: '',
  summaryAr: '',
  image: '',
})

function onSaveNews() {
  if (newNews.value.titleEn) {
    cms.addNewsItem({ ...newNews.value, image: '' })
    newNews.value = {
      month: 'MAY',
      day: '30',
      category: 'ANNOUNCEMENT',
      subtitle: 'ANNOUNCEMENT',
      titleEn: '',
      titleAr: '',
      summaryEn: '',
      summaryAr: '',
      image: '',
    }
    showAddNewsModal.value = false
    showToast('News card added!')
  }
}

// Security PIN change
const newPin = ref('')
function onChangePin() {
  if (newPin.value.trim()) {
    cms.updateAdminPin(newPin.value.trim())
    newPin.value = ''
    showToast('Admin Passcode PIN updated successfully!')
  }
}
</script>
