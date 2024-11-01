import {ISuperheroItemCard} from "../../interfaces/superheroes.ts";
import {useLoaderData} from "react-router-dom";
import SuperheroCard from "../../components/list/SuperheroCard.tsx";
import {Pagination} from "@nextui-org/react";
import {useEffect, useState} from "react";
import CustomSpinner from "../../components/spinner/Spinner.tsx";
import {sendErrorNotify} from "../../NotifyUtils.ts";
import {getAxios} from "../../constant.ts";

interface SuperHeroListPage {
    page: number;
    total: number;
    lastPage: number;
    superheroes: ISuperheroItemCard[]
}

export default function SuperheroList() {
    const [superheroes, setSuperheroes] = useState<SuperHeroListPage>(useLoaderData() as SuperHeroListPage);
    const [currentPage, setCurrentPage] = useState<number>(superheroes.page)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        loadSuperheroList(currentPage)
            .then((superHeroListPage) => setSuperheroes(superHeroListPage))
            .catch(() => sendErrorNotify("Can't load a list of superheroes. Please try again later."))
            .finally(() => setIsLoading(false));
    }, [currentPage]);

    if (isLoading) {
        return <CustomSpinner/>
    }
    return (
        <div>
            <div className="grid grid-cols-3 gap-2.5">
                {superheroes.superheroes.map((s: ISuperheroItemCard) =>
                    <SuperheroCard superhero={s} key={s.id}/>)
                }
            </div>
            <div className="mt-5 flex justify-center">
                <Pagination showControls
                            isCompact
                            loop
                            onChange={(page: number) => setCurrentPage(page)}
                            total={superheroes.lastPage}
                            initialPage={currentPage}
                />
            </div>
        </div>
    )
}

export async function loadSuperheroList(i: number = 1) {
    return await getAxios(`/superheroes/?page=${i}`)
}

