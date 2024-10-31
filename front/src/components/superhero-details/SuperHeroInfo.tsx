import SuperHeroInfoText from "./SuperHeroInfoText.tsx";
import {ISuperHeroDetails} from "../../pages/superhero-details/interface.ts";

export default function SuperHeroInfo({superhero}: { superhero: ISuperHeroDetails }) {
    return (
        <>
            <SuperHeroInfoText title="Real Name" content={superhero.realName}/>
            <SuperHeroInfoText title="Origin Description" content={superhero.originDescription.trim()}/>
            <SuperHeroInfoText title="Catch Phrase" content={superhero.catchPhrase}/>
            <SuperHeroInfoText title="Superpowers" content={superhero.superpowers}/>
        </>
    )
}