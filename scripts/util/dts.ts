import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import { Extractor, ExtractorConfig } from '@microsoft/api-extractor';
import { resolvePackagePath } from './project';
// import { getPakcages } from './util/project';

export function generateDts(pkgName) {
  
  // build types
  const target = pkgName;
  const pkgDir = resolvePackagePath(target);
  const pkg = require(`${pkgDir}/package.json`);
  
  const extractorConfigPath = path.resolve(pkgDir, `api-extractor.json`)
  const extractorConfig = ExtractorConfig.loadFileAndPrepare(
    extractorConfigPath
  );
  const extractorResult = Extractor.invoke(extractorConfig, {
    localBuild: true,
    showVerboseMessages: true
  });
  
  if (extractorResult.succeeded) {
    // concat additional d.ts to rolled-up dts
    const typesDir = path.resolve(pkgDir, 'types')
    if (fs.existsSync(typesDir)) {
      const dtsPath = path.resolve(pkgDir, pkg.types)
      const existing = fs.readFileSync(dtsPath, { encoding: 'utf-8' })
      const typeFiles = fs.readdirSync(typesDir)
      const toAdd = typeFiles.map(file => {
        return fs.readFileSync(path.resolve(typesDir, file), { encoding: 'utf-8' })
      })
      fs.writeFileSync(dtsPath, existing + '\n' + toAdd.join('\n'))
    }
    console.log(
      chalk.bold(chalk.green(`API Extractor completed successfully.`))
    )
  } else {
    console.error(
      `API Extractor completed with ${extractorResult.errorCount} errors` +
        ` and ${extractorResult.warningCount} warnings`
    )
    process.exitCode = 1
  }
  // await fs.rmSync(`${pkgDir}/dist/packages`, { recursive: true })
}
