import {Button} from "@nextui-org/react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {sendErrorNotify, sendSuccessfulNotify} from "../../NotifyUtils.ts";
import {useCallback} from "react";

export default function SuperheroActions({id}: { id: number }) {
    const navigation = useNavigate()

    const handleDelete = useCallback((): void => {
        axios.delete(`/superheroes/${id}`)
            .then(() => {
                sendSuccessfulNotify("Superhero delete successfully")
                navigation('/')
            }).catch(() => sendErrorNotify("Something wrong while trying to delete."))

    }, [])

    const handleEdit = useCallback((): void => {
        navigation(`/superhero/edit/${id}`)
    }, [])

    return (
        <div className="button-actions-detail">
            <Button variant="ghost"
                    color="primary"
                    onClick={handleEdit}>
                Edit
            </Button>
            <Button color="danger"
                    onClick={handleDelete}>
                Delete
            </Button>
        </div>
    )
}