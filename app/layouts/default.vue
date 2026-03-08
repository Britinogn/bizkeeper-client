<!-- <template>
    <div>
        <ClientOnly>
            <LayoutsNavbar />
            <slot />  
            <LayoutsFooter />
        </ClientOnly>
    </div>
</template> -->

<!-- <script setup lang="ts">
import { useSeo } from '~/composables/useSeo'

useSeo() // applies global defaults
</script> -->

<template>
  <div class="min-h-screen bg-[#0F0F0F] text-white">
    <LayoutsNavbar />
    <slot />
    <LayoutsFooter />
  </div>
</template>


<!-- <template>
  <div>
    <slot />
  </div>
</template> -->