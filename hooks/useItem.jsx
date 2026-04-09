import { ItemsContext } from "../Context/ItemsContext";
import { useContext } from "react";

export function useItem(){
    const context=useContext(ItemsContext)

    if(!context){
        throw new Error ("must be inside the ItemsProvider")
    }

    return context
}

