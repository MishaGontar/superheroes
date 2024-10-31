import {Button} from "@nextui-org/react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {sendSuccessfulNotify} from "../../NotifyUtils.ts";

export default function SuperHeroActions({id}: { id: number }) {
    const navigation = useNavigate()

    async function handleDelete() {
        await axios.delete(`/superheroes/${id}`)
        sendSuccessfulNotify("Superhero delete successfully")
        navigation('/')
    }

    async function handleEdit() {
        navigation(`/superhero/edit/${id}`)
    }

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