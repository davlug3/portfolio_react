import Header from '../components/Header/Header'
import Body from "../components/Body/Body"
import { useEffect } from 'react'
import { useData } from '../context/data';
import { Song } from '../context/data';



 function Root () {
   const [state, dispatch ] = useData();


  useEffect(()=> {
    const fetchData = async () => {
      try {
        const response = await fetch("test.json");
        const data = await response.json();
        dispatch({type: "ADD_SONG", payload: {songs: 
          data.data.map((x): Song=> {
            const christmas : boolean = x.Genre?.toUpperCase().search("CHRISTMAS") !== -1;
            const opm : boolean = x.Genre?.toUpperCase().search("OPM") !== -1;
            return {
              Id: x.Id,
              Artist: x.Artist,
              christmas,
              opm,
              count: x.Count,
              genre: x.Genre,
              tempo: x.Tempo,
              title: x.Title,
              year: x.Year
            }
          })

        }})
      }
      catch (e) {
console.log("sse" , e);
      }
    }
  
    fetchData();
  }, []);

  return (
    <div>
        <Header></Header>
        <Body></Body>
    </div>
  )
}

export default Root 