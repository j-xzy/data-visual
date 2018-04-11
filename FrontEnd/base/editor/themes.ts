export interface IThemes {
  [p: string]: any;
}

export const themes: IThemes = {
  dracula: () => import('brace/theme/dracula'),
  github: () => import('brace/theme/github')
  // ambiance: () => import('brace/theme/ambiance'),
  // chaos: () => import('brace/theme/chaos'),
  // chrome: () => import('brace/theme/chrome'),
  // clouds: () => import('brace/theme/clouds'),
  // clouds_midnight: () => import('brace/theme/clouds_midnight'),
  // cobalt: () => import('brace/theme/cobalt'),
  // crimson_editor: () => import('brace/theme/crimson_editor'),
  // dawn: () => import('brace/theme/dawn'),
  // dreamweaver: () => import('brace/theme/dreamweaver'),
  // eclipse: () => import('brace/theme/eclipse'),
  // gob: () => import('brace/theme/gob'),
  // gruvbox: () => import('brace/theme/gruvbox'),
  // idle_fingers: () => import('brace/theme/idle_fingers'),
  // iplastic: () => import('brace/theme/iplastic'),
  // katzenmilch: () => import('brace/theme/katzenmilch'),
  // kr_theme: () => import('brace/theme/kr_theme'),
  // kuroir: () => import('brace/theme/kuroir'),
  // merbivore: () => import('brace/theme/merbivore'),
  // merbivore_soft: () => import('brace/theme/merbivore_soft'),
  // mono_industrial: () => import('brace/theme/mono_industrial'),
  // monokai: () => import('brace/theme/monokai'),
  // pastel_on_dark: () => import('brace/theme/pastel_on_dark'),
  // solarized_dark: () => import('brace/theme/solarized_dark'),
  // solarized_light: () => import('brace/theme/solarized_light'),
  // sqlserver: () => import('brace/theme/sqlserver'),
  // terminal: () => import('brace/theme/terminal'),
  // textmate: () => import('brace/theme/textmate'),
  // tomorrow: () => import('brace/theme/tomorrow'),
  // tomorrow_night: () => import('brace/theme/tomorrow_night'),
  // tomorrow_night_blue: () => import('brace/theme/tomorrow_night_blue'),
  // tomorrow_night_bright: () => import('brace/theme/tomorrow_night_bright'),
  // tomorrow_night_eighties: () => import('brace/theme/tomorrow_night_eighties'),
  // twilight: () => import('brace/theme/twilight'),
  // vibrant_ink: () => import('brace/theme/vibrant_ink'),
  // xcode: () => import('brace/theme/xcode')
};