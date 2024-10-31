import {Card, CardHeader} from "@nextui-org/react";
import {ReactNode} from "react";

interface CardProps {
    headerText: string;
    children: ReactNode;
    cartClass?: string;
}

export default function CardCenter(props: CardProps) {
    return (
        <div className='container'>
            <Card className={props.cartClass ?? 'card'}>
                <CardHeader className="card-header">
                    {props.headerText}
                </CardHeader>
                {props.children}
            </Card>
        </div>
    )
}