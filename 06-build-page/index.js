const path = require('path');
const fs = require('fs/promises');

class Bundler {
  constructor(p = 'project-dist') {
    this.buildPath = path.join(__dirname, p);
  }

  async build() {
    await this.__prepare();
    await this.__init();

    this.__updateHTML();
    this.__updateCSS();
    this.__updateAssets();
  }

  async __prepare() {
    try {
      await fs.rm(this.buildPath, { recursive: true });
    } catch {
      // eslint-disable-next-line no-empty
    }
    await fs.mkdir(this.buildPath, { recursive: true });
  }  
  
  async __init() {
    const data = await fs.readFile(path.join(__dirname, 'template.html'));
    this.template = String(data);
  }

  async __updateAssets() {
    const targetDir = path.join(__dirname, 'assets');
    const destDir = path.join(this.buildPath, 'assets');

    await this.copyDir(targetDir, destDir);
  }

  async __updateHTML() {
    const regex = /{{.*}}/g;
    const data = await this.replaceAsync(this.template, regex, this.replacer);
    await fs.writeFile(path.join(this.buildPath, 'index.html'), data);
  }

  async __updateCSS() {
    const bundleFile = path.join(__dirname, 'project-dist', 'style.css');
    const stylesDir = path.join(__dirname, 'styles');

    const files = await fs.readdir(stylesDir);

    for (const file of files) {
      if (path.extname(file) !== '.css') return;

      const data = await fs.readFile(path.join(stylesDir, file));
      await fs.appendFile(bundleFile, data);
    }
  }

  async replaceAsync(str, regex, func) {
    const matches = str.match(regex);
    if (matches) {
      const replacement = await func(...matches);
      str = str.replace(matches[0], replacement);
      str = await this.replaceAsync(str, regex, func);
    }
    return str;
  }

  async replacer(s) {
    const component = s.slice(2).slice(0, -2);
    return await fs.readFile(
      path.join(__dirname, 'components', component + '.html')
    );
  }

  async copyDir(target, dest) {
    const content = await fs.readdir(target);

    for (const elem of content) {
      const elemPath = path.join(target, elem);
      const elemStat = await fs.stat(elemPath);

      if (elemStat.isDirectory()) {
        await fs.mkdir(path.join(dest, elem), { recursive: true });
        this.copyDir(elemPath, path.join(dest, elem));
      }

      if (elemStat.isFile()) {
        await fs.copyFile(elemPath, path.join(dest, elem));
      }
    }
  }
}

const b = new Bundler('project-dist');
b.build();
