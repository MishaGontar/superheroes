import {LoaderFunctionArgs, useLoaderData} from "react-router-dom";
import {CardBody} from "@nextui-org/react";
import axios from "axios";
import {ISuperHeroDetails} from "./interface.ts";
import CardCenter from "../../components/CardCenter.tsx";
import SuperHeroImage from "../../components/superhero-details/SuperHeroImage.tsx";
import './details.style.css'
import SuperHeroInfo from "../../components/superhero-details/SuperHeroInfo.tsx";
import SuperHeroActions from "../../components/superhero-details/SuperHeroActions.tsx";

export default function SuperHeroDetails() {
    const superhero = useLoaderData() as ISuperHeroDetails
    return (
        <CardCenter headerText={superhero.nickname} cartClass="cardDetails">
            <hr/>
            <CardBody className="card-body">
                {superhero.images.length > 0 && <SuperHeroImage images={superhero.images}/>}
                <div className="box-info-details">
                    <SuperHeroInfo superhero={superhero}/>
                    <SuperHeroActions id={superhero.id}/>
                </div>
            </CardBody>
        </CardCenter>
    )
}

export async function loadSuperHeroById({params}: LoaderFunctionArgs): Promise<ISuperHeroDetails> {
    const server = import.meta.env.VITE_BACK_URL;
    const response = await axios.get(`${server}/superheroes/${params.id}`)
    return response.data;
}