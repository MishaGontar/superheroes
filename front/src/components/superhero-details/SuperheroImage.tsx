import ArrowRight from "../../assets/ArrowRight.tsx";
import ArrowLeft from "../../assets/ArrowLeft.tsx";
import {useState} from "react";
import {backUrl} from "../../main.tsx";
import {Image} from "@nextui-org/react";
import {IImage} from "../../interfaces/image.ts";

export default function SuperheroImage({images}: { images: IImage[] }) {
    const [imgIndex, setImgIndex] = useState<number>(0)

    function handleArrowLick(n: number) {
        if (imgIndex === images.length - 1 && n > 0) {
            setImgIndex(0)
        } else if (imgIndex === 0 && n < 0) {
            setImgIndex(images.length - 1)
        } else {
            setImgIndex(prevState => prevState + n)
        }
    }

    return (
        <div className="box-image">
            <Image
                onClick={() => handleArrowLick(+1)}
                src={`${backUrl}/${images[imgIndex].path}`}
                alt={images[imgIndex].originalName}
                className="image-content"
            />
            {images.length > 1 &&
                <div className="box-arrows">
                    <button aria-label="Previous Image"
                            onClick={() => handleArrowLick(-1)}>
                        <ArrowLeft/>
                    </button>
                    <button aria-label="Next Image"
                            onClick={() => handleArrowLick(+1)}>
                        <ArrowRight/>
                    </button>
                </div>
            }
        </div>
    );
}