import {Form, Formik} from 'formik';
import {Button, CardBody} from "@nextui-org/react";
import {CustomField} from "./CustomField.tsx";
import ImageUploaderWithPreview from "./ImageUploaderWithPreview.tsx";
import {validationSchema} from "../../pages/superhero-create/validation.ts";
import {ISuperheroInformation, TypesSuperheroInfo} from "../../pages/superhero-create/interfaces.ts";
import CardCenter from "../CardCenter.tsx";
import {Images} from "../../pages/superhero-details/interface.ts";

interface SuperheroProps {
    initialValues: ISuperheroInformation,
    images?: Images[],
    handleSubmit: (values: TypesSuperheroInfo) => Promise<void>;
    buttonText: string;
    headerText: string;
}

export default function SuperheroForm(props: SuperheroProps) {
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
                            <ImageUploaderWithPreview images={props.images}/>
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