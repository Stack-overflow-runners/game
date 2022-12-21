import { SITE_THEMES } from './const';
import { SiteTheme } from '../models/theme.model';

export default async function createThemes() {
  try {
    await SiteTheme.sync();
    const themesCount = await SiteTheme.count();
    if (themesCount === 0) {
      await SiteTheme.bulkCreate(SITE_THEMES);
    }
  } catch (error: any) {
    console.log('Error creating themes', error);
  }
}
