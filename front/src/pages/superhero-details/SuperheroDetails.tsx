import {LoaderFunctionArgs, useLoaderData} from "react-router-dom";
import {CardBody} from "@nextui-org/react";
import CardCenter from "../../components/CardCenter.tsx";
import SuperheroImage from "../../components/superhero-details/SuperheroImage.tsx";
import './details.style.css'
import SuperheroInfo from "../../components/superhero-details/SuperheroInfo.tsx";
import SuperheroActions from "../../components/superhero-details/SuperheroActions.tsx";
import {ISuperheroDetails} from "../../interfaces/superheroes.ts";
import {getAxios} from "../../constant.ts";

export default function SuperheroDetails() {
    const superhero = useLoaderData() as ISuperheroDetails

    return (
        <CardCenter headerText={superhero.nickname} cartClass="cardDetails">
            <hr/>
            <CardBody className="card-body">
                {superhero.images.length > 0 && <SuperheroImage images={superhero.images}/>}
                <div className="box-info-details">
                    <SuperheroInfo superhero={superhero}/>
                    <SuperheroActions id={superhero.id}/>
                </div>
            </CardBody>
        </CardCenter>
    )
}

export async function loadSuperHeroById({params}: LoaderFunctionArgs) {
    return await getAxios(`/superheroes/${params.id}`)
}