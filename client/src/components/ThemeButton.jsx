import useTheme from "../contexts/theme";

const ThemeButton = () => {
  const { themeMode, darkTheme, lightTheme } = useTheme();

  const onChangeBtn = (e) => {
    const darkModeStatus = e.currentTarget.checked;
    if (darkModeStatus) {
      darkTheme();
    } else {
      lightTheme();
    }
  };

  return (
    <div className="flex items-center">
      <label htmlFor="theme-toggle" className="mr-2">
        {themeMode === 'dark' ? 'Dark Mode' : 'Light Mode'}
      </label>
      <input
        id="theme-toggle"
        type="checkbox"
        className="sr-only peer"
        onChange={onChangeBtn}
        checked={themeMode === 'dark'}
      />
      <div className="relative">
        <div className="w-11 h-6 bg-gray-200 rounded-full peer-focus:outline-none dark:bg-gray-700 peer-checked:bg-blue-600"></div>
        <div className="absolute left-0 top-0 bottom-0 m-0.5 w-5 h-5 bg-white border border-gray-300 rounded-full transition-transform duration-200 transform peer-checked:translate-x-5 dark:border-gray-600"></div>
      </div>
    </div>
  );
};

export default ThemeButton;
