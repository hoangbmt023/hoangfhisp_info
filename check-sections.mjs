import fs from 'fs';

const origCss = fs.readFileSync('c:/Users/hoang/Downloads/test-ui-iphone-duo/assets/index-bREh9WmE.css', 'utf8');

// Let's inspect where different parts are located in index-bREh9WmE.css
console.log('Total length:', origCss.length);

// Let's find font definitions, root variables, studio classes, bottom-tools, view-tools, etc.
const sections = [
  '@font-face',
  ':root',
  '.studio',
  '.topbar',
  '.workspace',
  '.device-stage',
  '.view-tools',
  '.finish-picker',
  '.bottom-tools',
  '.pose-presets',
  '.fold-toolbar',
  '.lens-panel',
  '.lighting-presets',
  '@media'
];

sections.forEach(sec => {
  let count = 0;
  let pos = 0;
  while (true) {
    const idx = origCss.indexOf(sec, pos);
    if (idx === -1) break;
    count++;
    pos = idx + sec.length;
  }
  console.log(`${sec}: ${count} occurrences`);
});
