import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'swpg1w6y',
    dataset: 'production',
  },
  studioHost: 'gctf',
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  deployment: {
    autoUpdates: true,
    appId: 'vbkofe9i6oogfr0ch7jko4sf',
  },
});
