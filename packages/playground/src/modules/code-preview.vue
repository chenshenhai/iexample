<template>
  <div class="code-preview-container">
    <ViewLayout class="code-preview" :defaultLeftWidth="200" :onSplitChange="onSplitChange" >
      <template #left class="left">
        <div>tree</div>
      </template>
      <template #right class="right">
        <code-box 
          :width="state.codeBoxWidth"
          :code="state.codeContent"
          :language="state.codeLanguage"
          :selectedLines="state.codeSelectedLines"
        ></code-box>
      </template>
    </ViewLayout>
  </div>
</template>

<script setup lang="ts" >
import { reactive, defineProps } from 'vue';
import ViewLayout from '../components/layout.vue';
import CodeBox from './code-box.vue';

const props = defineProps<{
  projectInfo: Types.ProjectInfo,
  projectOpenFile: string,
}>();


const defaultExpandAll = true;

const state = reactive<{
  codeBoxWidth: number,
  codeLanguage: Types.CodeLanguage,
  codeSelectedLines: Types.CodeSelectedLine[],
  codeContent: string,
  selectedKeys: string[],
  expandedKeys: string[],
}>({
  codeBoxWidth: -1,
  codeLanguage: 'plaintext',
  codeContent: '',
  codeSelectedLines: [],
  selectedKeys: [],
  expandedKeys: ['src'],
})

const onSplitChange = (e: { left: number, right: number }) => {
  const { right } = e;
  state.codeBoxWidth = right;
}

// const onTreeSelect = (
//   keys: string[],
//   e: {
//     selected: boolean,
//     selectedNodes: TreeDataItem[],
//   }
// ) => {
//   state.selectedKeys = keys;

//   if (e?.selectedNodes?.[0]?.isLeaf) {
//     const filePath = keys[0];
//     router.push({
//       name: 'code',
//       query: {
//         project: props.projectInfo.name,
//         file: filePath
//       }
//     })
//   }
// }

// function getCurrentFileSelectedLines(project: string, file: string): Types.CodeSelectedLine[] {
//   const lines: Types.CodeSelectedLine[] = [];
//   if (props.projectInfo?.name !== project) {
//     return lines;
//   }
//   const _search = (children: (Types.ProjectFile | Types.ProjectFolder)[]) => {
//     for (let i = 0; i < children.length; i++) {
//       if (lines.length > 0) {
//         break;
//       }
//       const child: Types.ProjectFile | Types.ProjectFolder = children[i];

//       if (child.type === 'file' && child.isLeaf && child.key === file) {
//         if (Array.isArray(child.selectedLines)) {
//           child.selectedLines.forEach((line) => {
//             lines.push({
//               start: line.start,
//               end: line.end,
//             })
//           })
//         }
//       } else if (child.type === 'folder') {
//         _search(child.children);
//       }
//       if (lines.length > 0) {
//         break;
//       }
//     }
//   }
//   _search(props.projectInfo?.folder || []);
//   return lines;
// }

 
</script>

<style scoped>
.code-preview-container {
  width: 100%;
  height: 100%;
  position: relative;
}
.code-preview {
  height: 100%;
}
.code-preview-result {
  width: 100%;
}

.code-preview-question {
  display: inline-block;
  width: 360px;
  padding: 20px;
  text-align: left;
  background: #2196f340;
}


</style>
