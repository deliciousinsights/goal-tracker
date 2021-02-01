import { addons } from '@storybook/addons'
const { create: createTheme } = require('@storybook/theming/create')

addons.setConfig({
  theme: createTheme({
    base: 'light',
    brandTitle: 'Goal Tracker',
    brandUrl: 'https://github.com/deliciousinsights/goal-tracker',
  }),
})
