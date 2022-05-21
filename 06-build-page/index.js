const path = require('path');
const fs = require('fs/promises');

class Bundler {  
  async init() {
    this.buildPath = path.join(__dirname, 'project-dist');
    const data = await fs.readFile(path.join(__dirname, 'template.html'));
    this.template = String(data);   
    await fs.mkdir(this.buildPath, { recursive: true }); 
  }

  async build(){
    await this.init();
    this.__updateHTML();
    // this.__updateCSS();
    // this.__updateAssets();
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
  
  async replacer (s) {    
    const component = s.slice(2).slice(0,-2);
    return await fs.readFile(path.join(__dirname, 'components', component + '.html'));     
  }

  async __updateHTML(){
    const regex = /{{.*}}/g;
    const data = await this.replaceAsync(this.template, regex, this.replacer);
    await fs.writeFile(path.join(this.buildPath, 'index.html'), data);
  }
}


const b = new Bundler('project-dist');
b.build();
