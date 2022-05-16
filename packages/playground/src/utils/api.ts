let basePath = './../../public';
if (import.meta.env.PROD) {
  basePath = './';
}


function fetchText(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fetch(url).then(res => {
      if (res.status === 200) {
        return res.text().then((text) => {
          resolve(text);
        }).catch(reject)
      } else {
        reject(res)
      }
    }).catch(reject)
  });
}

function fetchJson(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fetch(url).then(res => {
      if (res.status === 200) {
        return res.json().then((json) => {
          resolve(json);
        }).catch(reject)
      } else {
        reject(res)
      }
    }).catch(reject)
  });
}



export async function fetchProjectInfo(name: string): Promise<Types.ProjectInfo> {
  const projectInfo = (
    await fetchJson(`${basePath}/data/project/${name}/project.json`)
  ) as unknown as Types.ProjectInfo; 
  return projectInfo;
}

export async function fetchProjectFile(
  projectName: string,
  filePath: string,
): Promise<string> {
  const text = await fetchText(`${basePath}/data/project/${projectName}/${filePath}`); 
  return text;
}



export function getFileType(fileName: string): Types.CodeLanguage {
  const extMap: {
    [key: string]: Types.CodeLanguage
  } = {
    'js': 'javascript',
    'ts': 'typescript',
    'jsx': 'javascript',
    'tsx': 'typescript',
    'json':'json',
    'html': 'html', 
    'css': 'css',
    'md': 'markdown',
    'txt': 'plaintext',
  }
  const extName = fileName.split('.').pop() || 'txt';
  const lang:  Types.CodeLanguage = extMap[extName] || extMap['txt']
  return lang;
}