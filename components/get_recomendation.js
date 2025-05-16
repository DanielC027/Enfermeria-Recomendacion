import React, { useEffect, useState } from "react";
import appFirebase from "./credenciales";
import {getFirestore, collection, getDocs, doc} from "firebase/firestore";

const db = getFirestore(appFirebase)

function useRecomendaciones(){
    const [recomendaciones, setRecomendaciones] = useState([]);

    useEffect(() =>{
        const getLista = async () => {
            try{
                const querySnapshot = await getDocs(collection(db,'oferta'));
                const docs = []
                querySnapshot.docs.forEach((doc) => {
                    const {id, id_persona, sueldo, ubicacion, horario, dias} = doc.data()
                    docs.push({
                        id:doc.id,
                        id_persona,
                        sueldo,
                        ubicacion,
                        horario,
                        dias
                    })             
                });
                setRecomendaciones(docs);
            }
            catch (error){
                console.error('Error obteniendo ids',error);
            }
        }
        getLista();
    },[])
    return recomendaciones;
}

export default useRecomendaciones;