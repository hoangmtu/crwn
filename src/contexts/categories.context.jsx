import {  createContext, useState, useEffect } from "react";

import SHOP_DATA from "../shop-data";

import { addCollectionAndDocuments } from "../utils/firebsae/firebase.utils";
import { getCategoriesDocuments } from "../utils/firebsae/firebase.utils";

export const CategoriesContext = createContext({
    categoriesMap: {},
})

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({})
    useEffect(() => {
        addCollectionAndDocuments('categories', SHOP_DATA)
    }, [])

    useEffect(() => {
        const getCategoriesMap = async () => {
            const NewCategoryMap = await getCategoriesDocuments();
            setCategoriesMap(NewCategoryMap)
        }

        getCategoriesMap();
    }, [])

    const value = { categoriesMap };

    return (
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
}