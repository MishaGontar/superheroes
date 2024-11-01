import SuperheroForm from "../../components/form/SuperheroForm.tsx";
import axios, {AxiosError} from "axios";
import {useNavigate} from "react-router-dom";
import {HEADERS_FORM_DATA} from "../../constant.ts";
import {sendErrorNotify, sendSuccessfulNotify} from "../../NotifyUtils.ts";
import {ISuperheroDetails, ISuperheroInformation, SuperheroTypesInfo} from "../../interfaces/superheroes.ts";
import {ImageItem} from "../../components/form/image-uploader/ImageUploader.types.ts";

const initialValues: ISuperheroInformation = {
    nickname: '',
    realName: '',
    originDescription: '',
    catchPhrase: '',
    superpowers: '',
    images: [] as ImageItem[],
};

export default function SuperheroCreate() {
    const navigation = useNavigate();

    function handleCreate(values: SuperheroTypesInfo): void {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
            if (key === 'images') {
                value.forEach((image: ImageItem) => {
                    if (image.file) formData.append('images', image.file)
                })
            } else
                formData.append(key, value);
        });

        axios.post('/superheroes/detail', formData, HEADERS_FORM_DATA)
            .then((response) => {
                const superhero: ISuperheroDetails = response.data;
                sendSuccessfulNotify("Create superhero successfully!")
                navigation(`/superhero/${superhero.id}`)
            })
            .catch((error) => {
                const axiosError = error as AxiosError;
                sendErrorNotify(axiosError.status === 409
                    ? "Superhero with this nickname is already exist"
                    : "Something went wrong on our side")
                console.error('Error creating superhero:', axiosError);
            })
    }

    return (<>
            <SuperheroForm
                initialValues={initialValues}
                handleSubmit={handleCreate}
                buttonText="Create Superhero"
                headerText="Create a Superhero"
            />
        </>
    )
}