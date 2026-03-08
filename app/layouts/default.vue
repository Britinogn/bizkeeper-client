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
  <div>
    <slot />
  </div>
</template>