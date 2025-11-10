import { HStack, Icon } from "@chakra-ui/react";
import iconMap from "../entities/IconMap";
import Platform from "../entities/Platform";

interface Props {
  platforms: Platform[];
}

const PlatformIconList = ({ platforms }: Props) => {
  return (
    <HStack marginY={"10px"}>
      {platforms.map((platform) => (
        <Icon
          key={platform.id}
          as={iconMap[platform.slug]}
          color="gray.500"
          data-testid={`icon-${platform.slug}`}
        />
      ))}
    </HStack>
  );
};

export default PlatformIconList;
