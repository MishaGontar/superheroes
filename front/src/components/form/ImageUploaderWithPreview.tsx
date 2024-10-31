import {Button, Image} from "@nextui-org/react";
import {ErrorMessage, FormikHelpers} from "formik";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import {ISuperheroInformation} from "../../pages/superhero-create/interfaces.ts";
import {Images} from "../../pages/superhero-details/interface.ts";
import {backUrl} from "../../main.tsx";
import axios from "axios";

interface ChooseImageBtnProps {
    setFieldValue: FormikHelpers<ISuperheroInformation>['setFieldValue'];
    images?: Images[];
}

export const isUploadedImg = (path: string) => path.startsWith("upload")

export default function ImageUploaderWithPreview({setFieldValue, images = []}: ChooseImageBtnProps) {
    const [previewImages, setPreviewImages] = useState<string[]>(images.map(img => img.path));
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (images?.length > 0) {
            setFieldValue("images", previewImages);
        }
    }, []);

    async function handleFileChoose(event: ChangeEvent<HTMLInputElement>): Promise<void> {
        const files: FileList | null = event.currentTarget.files;
        if (files) {
            const fileArray: File[] = Array.from(files);
            await setFieldValue("images", fileArray);
            const previewUrls: string[] = fileArray.map(file => URL.createObjectURL(file));
            setPreviewImages(prevState => [...previewUrls, ...prevState]);
        }
    }

    function openFileDialog() {
        if (fileInputRef.current) fileInputRef.current.click();
    }

    async function removeImage(index: number) {
        const path = previewImages[index];
        const isLocalFile = !isUploadedImg(path)

        setPreviewImages(prevState => {
            const updatedImages = [...prevState];
            updatedImages.splice(index, 1);
            if (isLocalFile) {
                setFieldValue("images", updatedImages);
            }
            return updatedImages;
        });

        if (isLocalFile) {
            URL.revokeObjectURL(path);
            return
        }

        const img = images.find(i => i.path === path)
        if (!img) {
            console.warn("Can't find img by path", path)
            return;
        }
        await axios.delete(`/image/${img.id}`)
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
            {previewImages.length > 0 && <div className="m-2">
                <h1>Preview Images:</h1>
                <div className="text-xs text-gray-500">Click on image to remove</div>
            </div>
            }
            <div className="grid grid-cols-3 gap-1">
                {previewImages.map((src, index) => (
                    <Image
                        key={index}
                        onClick={() => removeImage(index)}
                        isZoomed
                        className="w-52 h-40 object-contain"
                        alt={`Preview ${index}`}
                        src={isUploadedImg(src) ? `${backUrl}/${src}` : src}
                    />
                ))}
            </div>
        </div>
    )
}