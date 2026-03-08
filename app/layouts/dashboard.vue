<template>
  <div class="flex h-screen bg-(--background) overflow-hidden">

    <!-- Sidebar -->
    <LayoutsAppSidebar ref="sidebarRef" />

    <!-- Main -->
    <div class="flex flex-col flex-1 overflow-hidden md:ml-60">

      <!-- Topbar -->
      <LayoutsAppTopbar @toggle-sidebar="toggleSidebar" />

      <!-- Page content -->
      <main class="flex-1 overflow-y-auto p-6">
        <slot />
      </main>

    </div>
  </div>
</template>

<script setup lang="ts">
const sidebarRef = ref()

function toggleSidebar() {
  if (sidebarRef.value) {
    sidebarRef.value.mobileOpen = !sidebarRef.value.mobileOpen
  }
}
</script>