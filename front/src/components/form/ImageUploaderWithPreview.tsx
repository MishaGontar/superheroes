import {Button, Image} from "@nextui-org/react";
import {ErrorMessage, useFormikContext} from "formik";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import {Images} from "../../pages/superhero-details/interface.ts";
import {backUrl} from "../../main.tsx";
import axios from "axios";

interface ChooseImageBtnProps {
    images?: Images[];
}

interface ImageItem {
    file?: File;
    url: string;
    isUploaded: boolean;
}

export default function ImageUploaderWithPreview({images = []}: ChooseImageBtnProps) {
    const [imageItems, setImageItems] = useState<ImageItem[]>(images.map(img => ({
        url: `${backUrl}/${img.path}`,
        isUploaded: true,
    })));
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const {setFieldValue} = useFormikContext();

    useEffect(() => {
        const filesForUpload = imageItems
            .filter(item => !item.isUploaded)
            .map(item => item.file);
        setFieldValue("images", filesForUpload);
    }, [imageItems]);

    async function handleFileChoose(event: ChangeEvent<HTMLInputElement>): Promise<void> {
        const files: FileList | null = event.currentTarget.files;
        if (!files) {
            return
        }
        const newImageItems: ImageItem[] = Array.from(files).map(file => ({
            file,
            url: URL.createObjectURL(file),
            isUploaded: false,
        }));
        setImageItems(prevItems => [...newImageItems, ...prevItems]);
    }

    function openFileDialog() {
        if (fileInputRef.current) fileInputRef.current.click();
    }

    async function removeImage(index: number) {
        const itemToRemove = imageItems[index];

        setImageItems(prevItems => prevItems.filter((_, i) => i !== index));

        if (itemToRemove.isUploaded) {
            const img = images.find(i => `${backUrl}/${i.path}` === itemToRemove.url);
            if (!img) {
                console.warn("Can't find img by path", itemToRemove.url);
                return;
            }
            await axios.delete(`/image/${img.id}`);
        } else if (itemToRemove.file) {
            URL.revokeObjectURL(itemToRemove.url);
        }
    }

    return (
        <div>
            <input
                type="file"
                accept="image/*"
                multiple
                hidden
                ref={fileInputRef}
                onChange={handleFileChoose}
            />
            <Button className="mt-2 w-1/2" variant="bordered" onClick={openFileDialog}>
                Choose Images
            </Button>
            <ErrorMessage name="images" component="div" className="error-msg text-sm"/>
            {imageItems.length > 0 && <div className="m-2">
                <h1>Preview Images:</h1>
                <div className="text-xs text-gray-500">Click on image to remove</div>
            </div>
            }
            <div className="grid grid-cols-3 gap-1">
                {imageItems.map((img, index) => (
                    <Image
                        key={index}
                        onClick={() => removeImage(index)}
                        isZoomed
                        className="w-52 h-40 object-contain"
                        alt={`Preview ${index}`}
                        src={img.url}
                    />
                ))}
            </div>
        </div>
    )
}