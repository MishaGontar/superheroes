import {ISuperheroInformation, TypesSuperheroInfo} from "./interfaces.ts";
import SuperheroForm from "../../components/form/SuperheroForm.tsx";
import axios, {AxiosError} from "axios";
import {ISuperHeroDetails} from "../superhero-details/interface.ts";
import {useNavigate} from "react-router-dom";
import {HEADERS_FORM_DATA} from "../../constant.ts";
import {sendErrorNotify, sendSuccessfulNotify} from "../../NotifyUtils.ts";

const initialValues: ISuperheroInformation = {
    nickname: '',
    realName: '',
    originDescription: '',
    catchPhrase: '',
    superpowers: '',
    images: [] as File[],
};

export default function CreateSuperHero() {
    const navigation = useNavigate();

    async function handleCreate(values: TypesSuperheroInfo) {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
            if (key === 'images')
                value.forEach((image: File) => formData.append('images', image))
            else
                formData.append(key, value);
        });

        try {
            const response = await axios.post('/superheroes/detail', formData, HEADERS_FORM_DATA);
            const superhero: ISuperHeroDetails = response.data;
            sendSuccessfulNotify("Create superhero successfully!")
            navigation(`/superhero/${superhero.id}`)
        } catch (error) {
            const axiosError = error as AxiosError;
            sendErrorNotify(axiosError.status === 409
                ? "Superhero with this nickname is already exist"
                : "Something went wrong on our side")
            console.error('Error creating superhero:', axiosError);
        }
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