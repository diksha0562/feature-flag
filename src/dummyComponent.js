import {useGetFeatureState} from './useGetFeatureFlag';

const DummyComp =  ()=>{
    const flag =  useGetFeatureState("extended-summary");
    console.log('flag',flag);
    return(
        <div>hey</div>
    )

}

export default DummyComp