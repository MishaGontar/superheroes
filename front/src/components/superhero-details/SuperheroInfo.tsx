import SuperheroInfoText from "./SuperheroInfoText.tsx";
import {ISuperheroDetails} from "../../interfaces/superheroes.ts";

export default function SuperheroInfo({superhero}: { superhero: ISuperheroDetails }) {
    return (
        <>
            <SuperheroInfoText title="Real Name" content={superhero.realName}/>
            <SuperheroInfoText title="Origin Description" content={superhero.originDescription.trim()}/>
            <SuperheroInfoText title="Catch Phrase" content={superhero.catchPhrase}/>
            <SuperheroInfoText title="Superpowers" content={superhero.superpowers}/>
        </>
    )
}