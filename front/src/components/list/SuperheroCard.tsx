import {ISuperheroItemCard} from "../../interfaces/superheroes.ts";
import {Card, CardBody, CardHeader, Image} from "@nextui-org/react";
import {backUrl} from "../../main.tsx";
import {IImage} from "../../interfaces/image.ts";
import {useNavigate} from "react-router-dom";
import './superhero-card.style.css'

interface SuperheroCardProps {
    superhero: ISuperheroItemCard;
}

export default function SuperheroCard({superhero}: SuperheroCardProps) {
    const image: IImage | null = superhero.images.length > 0 ? superhero.images[0] : null
    const navigate = useNavigate();

    return (
        <Card className="hero-card">
            <CardHeader className="hero-card-header">
                <h4 className="hero-card-header-text">{superhero.nickname}</h4>
            </CardHeader>
            <CardBody className="hero-card-body"
                      onClick={() => navigate(`/superhero/${superhero.id}`)}>
                <Image
                    alt="Image superhero"
                    className="hero-card-image"
                    src={image ? `${backUrl}/${image.path}` : ''}
                    height={220}
                    width={250}
                />
            </CardBody>
        </Card>
    )
}