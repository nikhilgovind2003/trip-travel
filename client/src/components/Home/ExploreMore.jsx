import CardSlider from "./CardSlider";

const ExploreMore = ({nearestPlace}) => {

  // usestate
  return (
    <div className="w-full bg-white rounded-xl my-4 shadow-lg p-2 lg:p-4">
    <h1 className="text-3xl font-semibold text-center lg:text-start">{nearestPlace? 'Nearest Places...' :'Explore More...'}</h1>
    <CardSlider nearestPlace={nearestPlace} />
    <div className="w-full flex justify-center mt-4">
      
    </div>
  </div>
  
  );
};

export default ExploreMore;
