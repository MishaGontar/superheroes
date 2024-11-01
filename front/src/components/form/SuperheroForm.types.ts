import {ISuperheroInformation, SuperheroTypesInfo} from "../../interfaces/superheroes.ts";

export interface SuperheroProps {
    initialValues: ISuperheroInformation,
    handleSubmit: (values: SuperheroTypesInfo) => void;
    buttonText: string;
    headerText: string;
}