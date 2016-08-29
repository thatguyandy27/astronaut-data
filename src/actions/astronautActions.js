import * as types from '../constants/astronautActionTypes.js';
import Astronaut from '../models/astronaut.js';

export function loadAstronauts() {
  return { type: types.LOAD_ASTRONAUTS };
}

export function loadAstronautsComplete(astronauts){
    return { type: types.LOAD_ASTRONAUTS_COMPLETE, astronauts };
}

export function triggerLoadAstroauts(){
     return (dispatch) => {
        dispatch(loadAstronauts());

        const options = {
            headers: {
                Accept: 'application/jason'
            }
        };

        fetch('/scraper/astronauts.json', options).then((resp) => resp.json()).then(astronauts => {
            dispatch(loadAstronautsComplete(astronauts.map((astronaut, index) => new Astronaut(astronaut, index))));
        });
    };

}