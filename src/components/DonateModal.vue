<template>
  <v-dialog v-model="show" max-width="600" persistent>
    <div class="bg-[#0A2924] border border-[#C5A059]/40 rounded-2xl p-6 sm:p-8 text-white relative shadow-2xl">
      
      <!-- Close Button -->
      <button
        @click="close"
        class="absolute top-4 right-4 text-gray-400 hover:text-white w-8 h-8 rounded-full bg-white/5 flex items-center justify-center transition-colors"
      >
        <v-icon size="18">mdi-close</v-icon>
      </button>

      <!-- Header -->
      <div class="text-center mb-6">
        <div class="w-12 h-12 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] mx-auto mb-3">
          <v-icon size="24">mdi-hand-heart-outline</v-icon>
        </div>
        <h3 class="text-2xl font-bold font-serif text-white">Make a Donation</h3>
        <p class="text-xs text-gray-300 mt-1">Support humanitarian aid, education, and religious projects worldwide.</p>
      </div>

      <!-- Donation Type Selection -->
      <div class="grid grid-cols-3 gap-2 mb-6">
        <button
          v-for="type in types"
          :key="type"
          @click="selectedType = type"
          :class="[
            'py-2 px-3 text-xs font-bold rounded-xl border transition-all',
            selectedType === type
              ? 'bg-[#C5A059] text-[#061916] border-[#C5A059]'
              : 'bg-[#133E37]/50 text-gray-300 border-[#C5A059]/20 hover:border-[#C5A059]/50'
          ]"
        >
          {{ type }}
        </button>
      </div>

      <!-- Preset Amount Buttons -->
      <div class="space-y-2 mb-6">
        <label class="text-xs font-bold text-[#C5A059] uppercase tracking-wider block">Select Amount ($USD)</label>
        <div class="grid grid-cols-4 gap-2">
          <button
            v-for="amt in amounts"
            :key="amt"
            @click="amount = amt"
            :class="[
              'py-2.5 text-xs font-mono font-bold rounded-xl border transition-all',
              amount === amt
                ? 'bg-[#E5C483] text-[#061916] border-[#E5C483]'
                : 'bg-[#061916] text-white border-[#C5A059]/30 hover:border-[#C5A059]'
            ]"
          >
            ${{ amt }}
          </button>
        </div>
      </div>

      <!-- Custom Amount Input -->
      <div class="mb-6">
        <label class="text-xs font-bold text-gray-300 block mb-1.5">Or Custom Amount</label>
        <div class="relative">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-mono">$</span>
          <input
            type="number"
            v-model.number="amount"
            placeholder="Enter custom amount"
            class="w-full bg-[#061916] border border-[#C5A059]/30 rounded-xl py-2.5 pl-8 pr-4 text-white text-sm font-mono focus:outline-none focus:border-[#C5A059]"
          />
        </div>
      </div>

      <!-- Payment Simulation Action -->
      <v-btn
        block
        color="#C5A059"
        size="x-large"
        class="text-xs font-bold text-[#061916] py-3 rounded-xl hover:bg-[#E5C483] transition-all"
        :loading="loading"
        @click="submitDonation"
      >
        <v-icon start size="18">mdi-lock-outline</v-icon>
        Proceed with ${{ amount }} Donation
      </v-btn>

      <p class="text-[10px] text-center text-gray-400 mt-4 flex items-center justify-center gap-1">
        <v-icon size="12" color="#C5A059">mdi-shield-check</v-icon>
        256-bit Encrypted Secure Payment
      </p>

    </div>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue', 'donated'])

const show = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const selectedType = ref('Sadaqah')
const types = ['Sadaqah', 'Zakat / Khums', 'Humanitarian']

const amount = ref(100)
const amounts = [25, 50, 100, 250]

const loading = ref(false)

function close() {
  show.value = false
}

function submitDonation() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    alert(`Thank you for your generous donation of $${amount.value} for ${selectedType.value}!`)
    emit('donated', { amount: amount.value, type: selectedType.value })
    close()
  }, 1200)
}
</script>
