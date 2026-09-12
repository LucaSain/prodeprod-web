import * as migration_20260912_174109 from './20260912_174109';
import * as migration_20260912_180945_templates_v05_and_i18n from './20260912_180945_templates_v05_and_i18n';

export const migrations = [
  {
    up: migration_20260912_174109.up,
    down: migration_20260912_174109.down,
    name: '20260912_174109',
  },
  {
    up: migration_20260912_180945_templates_v05_and_i18n.up,
    down: migration_20260912_180945_templates_v05_and_i18n.down,
    name: '20260912_180945_templates_v05_and_i18n'
  },
];
