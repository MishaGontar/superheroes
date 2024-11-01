import {Form, Formik} from 'formik';
import {Button, CardBody} from "@nextui-org/react";
import CustomField from "./field/CustomField.tsx";
import ImageUploaderWithPreview from "./image-uploader/ImageUploaderWithPreview.tsx";
import {validationSchema} from "./validation.ts";
import CardCenter from "../CardCenter.tsx";
import {SuperheroProps} from "./SuperheroForm.types.ts";
import {useMemo} from "react";
import {ImageItem} from "./image-uploader/ImageUploader.types.ts";

export default function SuperheroForm(props: SuperheroProps) {
    const images: ImageItem[] = useMemo(() => props.initialValues.images, [props.initialValues.images]);
    return (
        <CardCenter headerText={props.headerText}>
            <CardBody>
                <Formik
                    initialValues={props.initialValues}
                    validationSchema={validationSchema}
                    onSubmit={props.handleSubmit}
                >
                    {() => (
                        <Form>
                            <CustomField name="nickname"
                                         label="Nickname"
                                         placeholder="Enter nickname"
                                         errorMessage="Please enter a nickname"
                            />
                            <CustomField name="realName"
                                         label="Real Name"
                                         placeholder="Enter real name"
                                         errorMessage="Please enter a real name"
                            />
                            <CustomField name="originDescription"
                                         componentType="textarea"
                                         label="Origin Description"
                                         placeholder="Enter superhero origin description"
                                         errorMessage="Please enter a description for a superhero"
                            />
                            <CustomField name="catchPhrase"
                                         label="Catch Phrase"
                                         placeholder="Enter a catch phrase for a superhero"
                                         errorMessage="Please enter a catch phrase for a superhero"
                            />
                            <CustomField name="superpowers"
                                         label="Superpowers"
                                         placeholder="Enter a superpowers for a superhero"
                                         errorMessage="Please enter a superpowers for a superhero"
                            />
                            <ImageUploaderWithPreview images={images}/>
                            <Button color="warning" type="submit" className="mt-2" fullWidth>
                                {props.buttonText}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </CardBody>
        </CardCenter>
    );
};