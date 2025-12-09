import { Box, HStack, Switch, Text } from "@chakra-ui/react";
import { useSettingsStore } from "../settingsstore";

const NsfwToggle = () => {
  const hideNsfw = useSettingsStore((s) => s.hideNsfw);
  const setHideNsfw = useSettingsStore((s) => s.setHideNsfw);

  return (
    <Box px={1} py={1}>
      <HStack spacing={3}>
        <Switch
          size="md"
          colorScheme="yellow"
          isChecked={hideNsfw}
          onChange={(e) => setHideNsfw(e.target.checked)}
        />
        <Text fontSize="md" color="gray.300">
          Hide NSFW content
        </Text>
      </HStack>
    </Box>
  );
};

export default NsfwToggle;
