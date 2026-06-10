import * as migration_20260610_221855_initial from './20260610_221855_initial';
import * as migration_20260610_223559_add_programmes_sponsors from './20260610_223559_add_programmes_sponsors';
import * as migration_20260610_223945_add_content_models from './20260610_223945_add_content_models';

export const migrations = [
  {
    up: migration_20260610_221855_initial.up,
    down: migration_20260610_221855_initial.down,
    name: '20260610_221855_initial',
  },
  {
    up: migration_20260610_223559_add_programmes_sponsors.up,
    down: migration_20260610_223559_add_programmes_sponsors.down,
    name: '20260610_223559_add_programmes_sponsors',
  },
  {
    up: migration_20260610_223945_add_content_models.up,
    down: migration_20260610_223945_add_content_models.down,
    name: '20260610_223945_add_content_models'
  },
];
