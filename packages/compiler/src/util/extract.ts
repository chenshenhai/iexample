// const scriptReg = /<script\b(?:\s[^>]*>|>)([^]*?)<\/script>/gi;
// const reg = /<style\b(?:\s[^>]*>|>)([^]*?)<\/style>/gi;

export function parseScriptElementAttrs(elem: string): {
  [name: string]: string;
} {
  const attrs: { [name: string]: string } = {};
  const reg = /<script([^>]*?)>/;
  const attrStr = reg.exec(elem)?.[1]?.trim() || '';
  const items = attrStr.split(' ');
  items.forEach((item: string) => {
    const str = item?.trim();
    if (str) {
      const dataList = str.split('=');
      const name: string = dataList[0]?.trim() || '';
      const value: string =
        dataList[1]
          ?.trim()
          ?.replace(/(^"|"$)/gi, '')
          ?.replace(/(^'|;$)/gi, '') || '';
      attrs[name] = value;
    }
  });
  return attrs;
}

export function extractCode(
  source: string,
  opts: {
    type: 'template' | 'script' | 'style';
    withElement?: boolean;
  }
): string | null {
  let result: string | null = null;
  const reg = new RegExp(
    `<${opts.type}\\b(?:\\s[^>]*>|>)([^]*?)<\/${opts.type}>`,
    'gi'
  );
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
