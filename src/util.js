function addDevOverrideForFeature(featureFlag, value){
    let featureObj = sessionStorage.getItem('featureObj') || {};
    featureObj[featureFlag] = value
    sessionStorage.setItem(featureObj)
}