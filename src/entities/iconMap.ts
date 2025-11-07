import { IconType } from "react-icons";
import { BsGlobe } from "react-icons/bs";
import {
    FaAndroid,
    FaApple,
    FaLinux,
    FaPlaystation,
    FaWindows,
    FaXbox,
} from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";
import { SiNintendo } from "react-icons/si";

export const iconMap: { [key: string]: IconType } = {
    pc: FaWindows,
    playstation: FaPlaystation,
    xbox: FaXbox,
    nintendo: SiNintendo,
    mac: FaApple,
    linux: FaLinux,
    ios: MdPhoneIphone,
    web: BsGlobe,
    android: FaAndroid,
};