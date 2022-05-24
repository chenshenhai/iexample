<template>
  <result-status :status="props.status" />
  <div :class="{
      'preview-container': props.status === 'LOADED',
      'preview-hide': props.status !== 'LOADED'
    }"
    ref="container"></div>
  
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineProps, watch, watchEffect } from 'vue';
import { PreviewProxy } from './proxy';
import srcdocHTML from './srcdoc.html?raw';
import ResultStatus from './result-status.vue';

const props = defineProps<{
  status: IResultStatus,
  css: string,
  js: string,
  html: string,
}>()

const container = ref()
const runtimeError = ref()
const runtimeWarning = ref()

let sandbox: HTMLIFrameElement
let proxy: PreviewProxy

// create sandbox on mount
onMounted(() => {
  

  watch(props, () => {
    createSandbox();
  })
})



onUnmounted(() => {
  proxy.destroy();
})


watch(() => {
  return [
    // store?.files[0]?.code,
    // store?.files[1]?.code,
    // store?.files[2]?.code,
    // store?.files[3]?.code,
    // store?.files[4]?.code
  ]
}, () => {
  createSandbox();
});

function createSandbox() {
  if (sandbox) {
    proxy.destroy();
    container.value.removeChild(sandbox)
  }

  sandbox = document.createElement('iframe');
  sandbox.setAttribute('sandbox', [
    'allow-forms',
    'allow-modals',
    'allow-pointer-lock',
    'allow-popups',
    'allow-same-origin',
    'allow-scripts',
    'allow-top-navigation-by-user-activation'
  ].join(' '))

  const codeMap = {
    importmap: {},
    css: '',
    js: '',
    html: '',
  }
  
  const sandboxSrc = srcdocHTML.replace(/<!--__INJECT_STYLE__-->/, `\<style\>${props.css}\</style\>`)
    // .replace(/<!--__INJECT_IMPORTMAP__-->/, `\<script type="importmap"\>${codeMap.importmap}\</script\>`)
    .replace(/<!--__INJECT_HTML__-->/, props.html.replace(/<script[\s\S]*?<\/script>/ig, ''))
    .replace(/<!--__INJECT_JS__-->/, `\<script type="module"\>${props.js}\</script\>`);

  sandbox.srcdoc = sandboxSrc;
  container.value.appendChild(sandbox);
  proxy = createPreviewProxy(sandbox);
}

function createPreviewProxy(sandbox: HTMLIFrameElement): PreviewProxy {
  return new PreviewProxy(sandbox, {
    on_fetch_progress: (progress: any) => {
      // pending_imports = progress;
    },
    on_error: (event: any) => {
      const msg = event.value instanceof Error ? event.value.message : event.value
      if (
        msg.includes('Failed to resolve module specifier') ||
        msg.includes('Error resolving module specifier')
      ) {
        runtimeError.value = msg.replace(/\. Relative references must.*$/, '') +
        `.\nTip: add an "import-map.json" file to specify import paths for dependencies.`
      } else {
        runtimeError.value = event.value
      }
    },
    on_unhandled_rejection: (event: any) => {
      let error = event.value
      if (typeof error === 'string') {
        error = { message: error }
      }
      runtimeError.value = 'Uncaught (in promise): ' + error.message
    },
    on_console: (log: any) => {
      if (log.duplicate) {
        return
      }
      if (log.level === 'error') {
        if (log.args[0] instanceof Error) {
          runtimeError.value = log.args[0].message
        } else {
          runtimeError.value = log.args[0]
        }
      } else if (log.level === 'warn') {
        if (log.args[0].toString().includes('[Vue warn]')) {
          runtimeWarning.value = log.args
            .join('')
            .replace(/\[Vue warn\]:/, '')
            .trim()
        }
      }
    },
    on_console_group: (action: any) => {
      // group_logs(action.label, false);
    },
    on_console_group_end: () => {
      // ungroup_logs();
    },
    on_console_group_collapsed: (action: any) => {
      // group_logs(action.label, true);
    }
  })
}

</script>

<style>
.preview-container,
iframe {
  width: 100%;
  height: 100%;
  border: none;
  background-color: #fff;
}

.preview-hide {
  display: none;
}
</style>
