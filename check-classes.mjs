import fs from 'fs';

function getClasses(file) {
  const content = fs.readFileSync(file, 'utf8');
  const regex = /className=["'`{]([^"'`}]*)["'`}]/g;
  let m;
  const classes = new Set();
  while ((m = regex.exec(content)) !== null) {
    m[1].split(/\s+/).forEach(c => {
      c = c.replace(/[^a-zA-Z0-9_-]/g, '');
      if (c && !['true', 'false', 'undefined', 'null', 'isDark'].includes(c)) {
        classes.add(c);
      }
    });
  }
  return classes;
}

const contactFiles = [
  'src/pages/ContactPage/ContactPage.jsx',
  'src/components/Contact/DuoStage/DuoScene.jsx'
];

const allUsedClasses = new Set();
contactFiles.forEach(f => {
  if (fs.existsSync(f)) {
    const cls = getClasses(f);
    cls.forEach(c => allUsedClasses.add(c));
  }
});

console.log('Classes used in ContactPage & DuoScene:', Array.from(allUsedClasses).sort());

// Check if these classes are defined in test-ui-iphone-duo CSS
const origCss = fs.readFileSync('c:/Users/hoang/Downloads/test-ui-iphone-duo/assets/index-bREh9WmE.css', 'utf8');

const missingInOrig = [];
allUsedClasses.forEach(cls => {
  if (!origCss.includes('.' + cls)) {
    missingInOrig.push(cls);
  }
});
console.log('Missing in original CSS:', missingInOrig);
