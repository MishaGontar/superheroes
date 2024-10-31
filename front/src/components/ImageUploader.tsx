import {Button, Image} from "@nextui-org/react";
import {ErrorMessage, FormikHelpers} from "formik";
import {ChangeEvent, useRef, useState} from "react";
import {SuperheroProps} from "../pages/superhero-create/SuperheroForm.tsx";

interface ChooseImageBtnProps {
    setFieldValue: FormikHelpers<SuperheroProps>['setFieldValue'];
}

export default function ImageUploader({setFieldValue}: ChooseImageBtnProps) {
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    async function handleFileChoose(event: ChangeEvent<HTMLInputElement>): Promise<void> {
        const files: FileList | null = event.currentTarget.files;
        if (files) {
            const fileArray: File[] = Array.from(files);
            await setFieldValue("images", fileArray);
            const previewUrls: string[] = fileArray.map(file => URL.createObjectURL(file));
            setPreviewImages(previewUrls);
        }
    }

    function openFileDialog() {
        if (fileInputRef.current) {
            fileInputRef.current.click();
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
            {previewImages.length > 0 && <h1 className="mt-5">Preview Images:</h1>}
            <div className="grid grid-cols-5 gap-5 mt-2">
                {previewImages.map((src, index) => (
                    <Image
                        key={index}
                        isZoomed
                        width={100}
                        height={120}
                        prefix=".png"
                        alt={`Preview ${index}`}
                        src={src}
                    />
                ))}
            </div>
        </div>
    )
}