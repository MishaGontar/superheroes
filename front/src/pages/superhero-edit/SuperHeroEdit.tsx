import SuperheroForm from "../../components/form/SuperheroForm.tsx";
import {useLoaderData, useNavigate} from "react-router-dom";
import {useMemo} from "react";
import {ISuperHeroDetails} from "../superhero-details/interface.ts";
import {ISuperheroInformation, TypesSuperheroInfo} from "../superhero-create/interfaces.ts";
import axios, {AxiosResponse} from "axios";
import {HEADERS_FORM_DATA} from "../../constant.ts";

export default function SuperHeroEdit() {
    const superhero = useLoaderData() as ISuperHeroDetails;
    const navigation = useNavigate();
    const initValue: ISuperheroInformation = useMemo(() => ({
        nickname: superhero.nickname,
        originDescription: superhero.originDescription,
        realName: superhero.realName,
        catchPhrase: superhero.catchPhrase,
        superpowers: superhero.superpowers,
        images: []
    }), [])

    async function handleEdit(values: TypesSuperheroInfo) {
        const {images, ...formValueData} = values;
        const formImagesData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
            if (key === 'images') {
                if (value[0] instanceof File)
                    value.forEach((image: File) => formImagesData.append('images', image))
            }

        });
        const isAnyImg: boolean = !(formImagesData.entries().next().done)
        const events: Promise<AxiosResponse>[] = [
            axios.patch(`superheroes/${superhero.id}`, formValueData)
        ]


        if (isAnyImg) {
            events.push(axios.post(`image/superhero/${superhero.id}`, formImagesData, HEADERS_FORM_DATA))
        }
        await Promise.all(events)
        navigation(`/superhero/${superhero.id}`)
    }

    return (
        <SuperheroForm
            headerText="Edit Superhero"
            initialValues={initValue}
            images={superhero.images}
            handleSubmit={handleEdit}
            buttonText="Save changes"
        />
    )
}