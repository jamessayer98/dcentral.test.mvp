import { FormLabel, Switch, useColorMode } from "@chakra-ui/react";

interface ThemeTogglerProps {
  showLabel: boolean;
}

const ThemeToggeler = ({ showLabel = false, ...rest }: ThemeTogglerProps) => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <>
      {showLabel && (
        <FormLabel htmlFor="theme-toggler" mb="0">
          Enable Dark Theme
        </FormLabel>
      )}
      <Switch
        id="theme-toggler"
        size="sm"
        isChecked={colorMode === "dark"}
        isDisabled={false}
        value={colorMode}
        colorScheme="orange"
        variant="ghost"
        mr={2}
        onChange={toggleColorMode}
        {...rest}
      />
    </>
  );
};

export default ThemeToggeler;
