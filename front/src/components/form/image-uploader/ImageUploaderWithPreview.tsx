import {Button, Image} from "@nextui-org/react";
import {useFormikContext} from "formik";
import {ChangeEvent, useCallback, useEffect, useRef, useState} from "react";
import axios from "axios";
import {ChooseImageBtnProps, ImageItem} from "./ImageUploader.types.ts";
import {sendErrorNotify, sendInfoNotify} from "../../../NotifyUtils.ts";
import {v4 as uuid} from 'uuid'

function ImageUploaderWithPreview({images = []}: ChooseImageBtnProps) {
    const [imageItems, setImageItems] = useState<ImageItem[]>(images);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const {setFieldValue} = useFormikContext();

    useEffect(() => {
        const filesForUpload = imageItems.filter(item => !item.isUploaded);
        setFieldValue("images", filesForUpload);
    }, [imageItems, setFieldValue]);

    const handleFileChoose = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const files: FileList | null = event.currentTarget.files;
        if (!files) {
            return;
        }
        const newImageItems: ImageItem[] = Array.from(files).map(file => ({
            id: uuid(),
            file,
            url: URL.createObjectURL(file),
            isUploaded: false,
        }));
        setImageItems(prevItems => [...newImageItems, ...prevItems]);
    }, []);

    const openFileDialog = useCallback(() => {
        if (fileInputRef.current) fileInputRef.current.click();
    }, []);

    const removeImage = useCallback((id: number | string) => {
        const itemToRemove = imageItems.find(i => i.id === id);
        if (!itemToRemove) {
            sendErrorNotify("Can't remove image")
            return;
        }
        const updateImageItems = () => {
            setImageItems(prevItems => prevItems.filter((i) => i.id !== id));
        };
        if (itemToRemove.isUploaded) {
            axios.delete(`/image/${itemToRemove.id}`)
                .then(() => {
                    sendInfoNotify("Image successfully deleted.")
                    updateImageItems()
                })
                .catch(() => sendErrorNotify("Can't remove image"));
        } else if (itemToRemove.file) {
            URL.revokeObjectURL(itemToRemove.url);
            updateImageItems();
        }
    }, [imageItems]);

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
            {imageItems.length > 0 && <div className="m-2">
                <h1>Preview Images:</h1>
                <div className="text-xs text-gray-500">Click on image to remove</div>
            </div>
            }
            <div className="grid grid-cols-3 gap-1">
                {imageItems.map((img) => (
                    <Image
                        key={img.id}
                        onClick={() => removeImage(img.id)}
                        isZoomed
                        className="w-52 h-40 object-contain"
                        alt={`Preview ${img.id}`}
                        src={img.url}
                    />
                ))}
            </div>
        </div>
    )
}

export default ImageUploaderWithPreview