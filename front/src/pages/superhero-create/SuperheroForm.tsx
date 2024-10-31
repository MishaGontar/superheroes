import {Form, Formik} from 'formik';
import axios from 'axios';
import './superhero.style.css'
import {Button, Card, CardBody, CardHeader} from "@nextui-org/react";
import {CustomField} from "../../components/CustomField.tsx";
import ImageUploader from "../../components/ImageUploader.tsx";
import {validationSchema} from "./validation.ts";
import {SuperheroProps} from "./interfaces.ts";

const initialValues: SuperheroProps = {
    nickname: '',
    realName: '',
    originDescription: '',
    catchPhrase: '',
    superpowers: '',
    images: [] as File[],
};

export default function SuperheroForm() {

    async function handleSubmit(values: typeof initialValues) {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
            if (key === 'images')
                value.forEach((image: File) => formData.append('images', image))
            else
                formData.append(key, value);
        });

        try {
            const response = await axios.post('/superheroes/detail', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Superhero created:', response.data);
        } catch (error) {
            console.error('Error creating superhero:', error);
        }
    }

    return (
        <div className="container">
            <Card className="card">
                <CardHeader className="card-header">
                    Create a Superhero
                </CardHeader>
                <CardBody>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({setFieldValue}) => (
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
                                <ImageUploader setFieldValue={setFieldValue}/>
                                <Button color="warning" type="submit" className="mt-2" fullWidth>
                                    Create Superhero
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </CardBody>
            </Card>
        </div>
    );
};