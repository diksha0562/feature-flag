import {fetchAllFeatures} from './getData';
import {DataContext} from './contextInfo';
import { useContext, useEffect, useState } from "react";

export  function useGetFeatureState(featureFlag){
    let [featuresData, setFeaturesData] = useContext(DataContext)
    const [allfeatureData, setallFeatureData] = useState(featuresData || {});


    async function loadData(){
        if(Object.keys(featuresData).length){
            setallFeatureData(featuresData);
            return
        }
        let allFeatures = await fetchAllFeatures();
        setFeaturesData(allFeatures)
        setallFeatureData(allFeatures)

    }

    useEffect(()=>{
        loadData()
    },[]);

    let featureObj = sessionStorage.getItem('featureObj') || {};

    let finalFeatureData = { ...allfeatureData, ...featureObj}

    return finalFeatureData[featureFlag] || false
    

  }