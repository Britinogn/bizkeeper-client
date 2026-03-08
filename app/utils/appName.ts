

const appName = ref('BizKeeper')

const appNameShort = computed(() => appName.value.replace(/\s+/g, '').toLowerCase())


const setAppName =  (name: string) => { 
    appName.value = name
}


export { appName, appNameShort, setAppName }
