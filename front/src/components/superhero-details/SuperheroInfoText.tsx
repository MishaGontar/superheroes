interface SuperHeroInfoProps {
    title: string;
    content: string;
}

export default function SuperheroInfoText({title, content}: SuperHeroInfoProps) {
    return (
        <div className="text-info">
            {title}: <span className="text-info-content">{content}</span>
            <hr className="text-line"/>
        </div>
    );
}