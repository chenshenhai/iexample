export function filterCssFiles(ast: any[]): string[] {
  const cssPathList: string[] = [];
  if (Array.isArray(ast)) {
    ast.forEach((item: any, index: number) => {
      if (item?.type === 'ImportDeclaration') {
        const importValue: string = item?.source?.value || '';
        if (item?.specifiers?.length === 0 && importValue.endsWith('.css')) {
          cssPathList.push(importValue);
          ast.splice(index, 1);
        }
      }
    });
  }
  // TODO
  return cssPathList;
}
