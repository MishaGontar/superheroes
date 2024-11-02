import SuperheroForm from "../../components/form/SuperheroForm.tsx";
import {useLoaderData, useNavigate} from "react-router-dom";
import axios, {AxiosResponse} from "axios";
import {HEADERS_FORM_DATA} from "../../constant.ts";
import {ISuperheroDetails, ISuperheroInformation, SuperheroTypesInfo} from "../../interfaces/superheroes.ts";
import {sendInfoNotify, sendUnexpectedErrorNotify} from "../../NotifyUtils.ts";
import {ImageItem} from "../../components/form/image-uploader/ImageUploader.types.ts";
import {backUrl} from "../../main.tsx";

export default function SuperheroEdit() {
    const superhero = useLoaderData() as ISuperheroDetails

    const navigation = useNavigate();
    const initValue: ISuperheroInformation = {
        nickname: superhero.nickname,
        originDescription: superhero.originDescription,
        realName: superhero.realName,
        catchPhrase: superhero.catchPhrase,
        superpowers: superhero.superpowers,
        images: superhero.images.map(img => ({
            id: img.id,
            url: `${backUrl}/${img.path}`,
            isUploaded: true,
        }))
    }

    const handleEdit = (values: SuperheroTypesInfo) => {
        const {images, ...formValueData} = values;
        const formImagesData = new FormData();
        images.forEach((image: ImageItem) => {
            if (image.file) formImagesData.append('images', image.file)
        })

        const events: Promise<AxiosResponse>[] = [axios.patch(`superheroes/${superhero.id}`, formValueData)]
        const isAnyImg: boolean = !(formImagesData.entries().next().done)
        if (isAnyImg) {
            events.push(axios.post(`image/superhero/${superhero.id}`, formImagesData, HEADERS_FORM_DATA))
        }
        Promise.all(events)
            .then(() => {
                sendInfoNotify(`Superhero ${formValueData.nickname} was updated`)
                navigation(`/superhero/${superhero.id}`)
            })
            .catch(sendUnexpectedErrorNotify)
    }

    return (
        <SuperheroForm
            headerText="Edit Superhero"
            initialValues={initValue}
            handleSubmit={handleEdit}
            buttonText="Save changes"
        />
    )
}