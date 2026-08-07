<template>
  <v-dialog v-model="show" max-width="650" persistent>
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
          <v-icon size="24">mdi-help-circle-outline</v-icon>
        </div>
        <h3 class="text-2xl font-bold font-serif text-white">Ask a Religious Question</h3>
        <p class="text-xs text-gray-300 mt-1">Submit your jurisprudential or theological questions to qualified scholars.</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="submitQuestion" class="space-y-4">
        <div>
          <label class="text-xs font-bold text-[#C5A059] uppercase tracking-wider block mb-1">Category</label>
          <select
            v-model="category"
            class="w-full bg-[#061916] border border-[#C5A059]/30 rounded-xl py-2.5 px-3 text-white text-xs focus:outline-none focus:border-[#C5A059]"
          >
            <option value="Jurisprudence (Fiqh)">Jurisprudence (Fiqh)</option>
            <option value="Theology (Aqaid)">Theology (Aqaid)</option>
            <option value="Ethics (Akhlaq)">Ethics (Akhlaq)</option>
            <option value="Family & Social Issues">Family & Social Issues</option>
          </select>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="text-xs font-bold text-gray-300 block mb-1">Your Name</label>
            <input
              type="text"
              v-model="name"
              required
              placeholder="e.g. Ali Ahmed"
              class="w-full bg-[#061916] border border-[#C5A059]/30 rounded-xl py-2.5 px-3 text-white text-xs focus:outline-none focus:border-[#C5A059]"
            />
          </div>
          <div>
            <label class="text-xs font-bold text-gray-300 block mb-1">Email Address</label>
            <input
              type="email"
              v-model="email"
              required
              placeholder="name@example.com"
              class="w-full bg-[#061916] border border-[#C5A059]/30 rounded-xl py-2.5 px-3 text-white text-xs focus:outline-none focus:border-[#C5A059]"
            />
          </div>
        </div>

        <div>
          <label class="text-xs font-bold text-gray-300 block mb-1">Your Question</label>
          <textarea
            v-model="questionText"
            required
            rows="4"
            placeholder="Write your detailed question here..."
            class="w-full bg-[#061916] border border-[#C5A059]/30 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-[#C5A059]"
          ></textarea>
        </div>

        <v-btn
          block
          type="submit"
          color="#C5A059"
          size="x-large"
          class="text-xs font-bold text-[#061916] py-3 rounded-xl hover:bg-[#E5C483] transition-all"
          :loading="loading"
        >
          <v-icon start size="18">mdi-send-outline</v-icon>
          Submit Inquiry
        </v-btn>
      </form>

    </div>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue', 'submitted'])

const show = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const category = ref('Jurisprudence (Fiqh)')
const name = ref('')
const email = ref('')
const questionText = ref('')
const loading = ref(false)

function close() {
  show.value = false
}

function submitQuestion() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    alert('Your question has been submitted successfully! You will receive a response via email.')
    emit('submitted', { category: category.value, name: name.value })
    name.value = ''
    email.value = ''
    questionText.value = ''
    close()
  }, 1000)
}
</script>
