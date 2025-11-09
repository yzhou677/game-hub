import bullsEye from "../assets/bulls-eye.webp";
import meh from "../assets/meh.webp";
import thumbsUp from "../assets/thumbs-up.webp";

const ratingMap: {
    [key: number]: { label: string; src: string; alt: string; boxSize: string }
} = {
    3: { label: "Meh", src: meh, alt: "meh", boxSize: "25px" },
    4: { label: "Recommended", src: thumbsUp, alt: "recommended", boxSize: "25px" },
    5: { label: "Exceptional", src: bullsEye, alt: "exceptional", boxSize: "35px" },
};

export const ratingsColorMap: {
    [key: number]: { title: string; color: string }
} = {
    1: {title: "skip", color: "red.400"},
    3: {title: "meh", color: "orange.400"},
    4: {title: "recommended", color: "blue.400"},
    5: {title: "exceptional", color: "green.400"}
}

export default ratingMap;