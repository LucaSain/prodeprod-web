import * as migration_20260912_174109 from './20260912_174109';
import * as migration_20260912_180945_templates_v05_and_i18n from './20260912_180945_templates_v05_and_i18n';
import * as migration_20261003_132757_add_ro_locale_and_gallery from './20261003_132757_add_ro_locale_and_gallery';

export const migrations = [
  {
    up: migration_20260912_174109.up,
    down: migration_20260912_174109.down,
    name: '20260912_174109',
  },
  {
    up: migration_20260912_180945_templates_v05_and_i18n.up,
    down: migration_20260912_180945_templates_v05_and_i18n.down,
    name: '20260912_180945_templates_v05_and_i18n',
  },
  {
    up: migration_20261003_132757_add_ro_locale_and_gallery.up,
    down: migration_20261003_132757_add_ro_locale_and_gallery.down,
    name: '20261003_132757_add_ro_locale_and_gallery'
  },
];
