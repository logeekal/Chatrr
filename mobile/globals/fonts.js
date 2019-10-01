export const mainThemeFonts = {
  input: {
    family: 'RobotMono',
    size: 28,
  },
  family: {
    roboto: type => {
      return `RobotoMono-${type}`;
    },
    quicksand: type => {
      return `Quicksand-${type}`;
    },
  },
  general: 'QuickSand',
};
