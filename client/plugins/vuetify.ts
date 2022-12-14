import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { MAIN_THEME, mainTheme, MAIN_DARK_THEME, mainDarkTheme } from "../helpers/themes";
import { defaults } from "../helpers/defaults";


export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    defaults,
		// add theme
		theme: {
			defaultTheme: MAIN_THEME,
			themes: {
				mainTheme,
				mainDarkTheme,
			},
			// add color variations
			variations: {
				colors: ["primary", "secondary"],
				lighten: 3,
				darken: 3,
			},
		},
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    }
  })

  nuxtApp.vueApp.use(vuetify)
})