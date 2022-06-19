// const scriptReg = /<script\b(?:\s[^>]*>|>)([^]*?)<\/script>/gi;
// const reg = /<style\b(?:\s[^>]*>|>)([^]*?)<\/style>/gi;


export function extractCode(source: string, opts: {
  type: 'template' | 'script' | 'style';
  withElement?: boolean
}): string | null {
  let result: string | null = null;
  const reg = new RegExp(`<${opts.type}\\b(?:\\s[^>]*>|>)([^]*?)<\/${opts.type}>`, 'gi')
  const execResult = reg.exec(source);
  if (execResult && execResult?.length > 0) {
    if (opts?.withElement === true) {
      result = execResult[0]; 
    } else {
      result = execResult[1];
    }
  }
  return result;
}