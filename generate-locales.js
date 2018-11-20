
const { generateFromDirectory } = require('lang-text');
const { join } = require('path');
const { writeFileSync } = require('fs');

const directory = join(__dirname, 'locales');
const code = generateFromDirectory({ directory, languages: ['ro', 'ru'] });

writeFileSync(join(__dirname, 'src', 'generated-locales.ts'), code, 'utf8');
