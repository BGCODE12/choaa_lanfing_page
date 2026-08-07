<template>
  <v-dialog v-model="show" max-width="700" persistent>
    <div class="bg-[#0A2924] border border-[#C5A059]/40 rounded-2xl p-6 sm:p-8 text-white relative shadow-2xl">
      
      <!-- Close Button -->
      <button
        @click="close"
        class="absolute top-4 right-4 text-gray-400 hover:text-white w-8 h-8 rounded-full bg-white/5 flex items-center justify-center transition-colors"
      >
        <v-icon size="18">mdi-close</v-icon>
      </button>

      <!-- Header -->
      <div class="flex items-center gap-3 mb-6 pb-4 border-b border-[#C5A059]/20">
        <div class="w-10 h-10 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059]">
          <v-icon size="20">mdi-clock-outline</v-icon>
        </div>
        <div>
          <h3 class="text-xl font-bold font-serif text-white">Daily Prayer Schedule</h3>
          <p class="text-xs text-gray-300">Najaf, Iraq • Wednesday, 22 Dhul Qadah 1445 AH</p>
        </div>
      </div>

      <!-- Prayer Schedule List -->
      <div class="space-y-3 mb-6">
        <div
          v-for="p in prayerTimes"
          :key="p.name"
          :class="[
            'flex justify-between items-center p-3.5 rounded-xl border transition-all',
            p.next
              ? 'bg-[#133E37] border-[#C5A059] text-white shadow-lg'
              : 'bg-[#061916]/60 border-[#C5A059]/20 text-gray-300'
          ]"
        >
          <div class="flex items-center gap-3">
            <v-icon size="20" :color="p.next ? '#E5C483' : '#C5A059'">{{ p.icon }}</v-icon>
            <div>
              <span class="text-sm font-bold block">{{ p.name }}</span>
              <span class="text-[10px] text-gray-400 font-mono">{{ p.arabic }}</span>
            </div>
          </div>

          <div class="text-right">
            <span class="text-base font-bold font-mono text-[#E5C483]">{{ p.time }}</span>
            <span v-if="p.next" class="block text-[10px] font-bold text-emerald-400 uppercase tracking-widest">NEXT PRAYER</span>
          </div>
        </div>
      </div>

      <div class="text-center pt-2">
        <v-btn
          color="#C5A059"
          class="text-xs font-bold text-[#061916] px-6 py-2.5 rounded-xl"
          @click="close"
        >
          Close Schedule
        </v-btn>
      </div>

    </div>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue'])

const show = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

function close() {
  show.value = false
}

const prayerTimes = [
  { name: 'Fajr', arabic: 'الفجر', time: '03:42 AM', icon: 'mdi-weather-sunset-up', next: false },
  { name: 'Sunrise', arabic: 'الشروق', time: '05:08 AM', icon: 'mdi-weather-sunny', next: false },
  { name: 'Dhuhr', arabic: 'الظهر', time: '12:15 PM', icon: 'mdi-weather-sunny-alert', next: true },
  { name: 'Asr', arabic: 'العصر', time: '03:55 PM', icon: 'mdi-weather-partly-cloudy', next: false },
  { name: 'Maghrib', arabic: 'المغرب', time: '07:22 PM', icon: 'mdi-weather-sunset-down', next: false },
  { name: 'Isha', arabic: 'العشاء', time: '08:48 PM', icon: 'mdi-weather-night', next: false },
]
</script>
