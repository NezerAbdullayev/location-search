import { Place } from "./Place";

interface SearchResponse{
    features?:{
        geometry:{
            coordinates:number[];
        }
        properties:{
            place_id:number;
            display_name:string;
        }
    }
}

export const search=async(term:string)=>{
   try {
    const res= await fetch(
        `https://nominatim.openstreetmap.org/search?q=${term}&format=geojson&addressdetails=1&layer=address&limit=5`
    );

    if (!res.ok) {
        throw new Error("API isteği başarısız oldu.");
    }

    const data: SearchResponse= (await res.json()) 

    if (!data.features) {
        throw new Error("API yanıtında beklenen 'features' bulunamadı.");
    }

    console.log(data)

    const places:Place[]= data.features.map((fature)=>{
        return{
            id:fature.properties.place_id,
            name:fature.properties.display_name,
            longitude:fature.geometry.coordinates[0],
            latitude:fature.geometry.coordinates[1],
        }
    })
    return places

   } catch (error) {
       return []; 
   }
}