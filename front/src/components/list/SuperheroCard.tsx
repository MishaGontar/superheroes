import {ISuperheroItemCard} from "../../interfaces/superheroes.ts";
import {Card, CardBody, CardHeader, Image} from "@nextui-org/react";
import {backUrl} from "../../main.tsx";
import {IImage} from "../../interfaces/image.ts";
import {useNavigate} from "react-router-dom";

interface SuperheroCardProps {
    superhero: ISuperheroItemCard;
}

export default function SuperheroCard({superhero}: SuperheroCardProps) {
    const image: IImage | null = superhero.images.length > 0 ? superhero.images[0] : null
    const navigate = useNavigate();

    return (
        <Card className="py-4 dark:hover:bg-gray-700 hover:bg-gray-200 cursor-pointer">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h4 className="font-bold text-large">{superhero.nickname}</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2 items-center"
                      onClick={() => navigate(`/superhero/${superhero.id}`)}>
                <Image
                    alt="Image superhero"
                    className="object-contain rounded-xl"
                    src={image ? `${backUrl}/${image.path}` : ''}
                    height={220}
                    width={250}
                />
            </CardBody>
        </Card>
    )
}