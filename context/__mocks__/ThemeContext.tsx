const useTheme = jest.fn(() => {
  return { isDark: true };
});

module.exports = { useTheme };
