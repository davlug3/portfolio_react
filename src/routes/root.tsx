import Header from '../components/Header/Header'
import Body from "../components/Body/Body"
import { useEffect } from 'react'
import { useData } from '../context/data';
import { Song } from '../context/data';

interface SongDataFromApi {
    level_0 : number,
    index: number,
    Id: number,
    DateNew: string,
    Date: string,
    Time: string,
    Artist: string,
    Title: string,
    Genre: string,
    Year: string,
    Tempo: string,
    Count: number
}


const createIndexedDb = () : Promise<IDBDatabase>=> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("data", 1);
    request.onerror = (error) => console.error(`IndexedDB `, error) ;
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = () => {
      console.log("onupgradeneeded");
      const db = request.result;
      const store = db.createObjectStore('store', { keyPath: "Id"});

      store.createIndex("Id", "Id", { unique: true})
      store.createIndex("Artist", "Artist", {unique: false} )
      store.createIndex("title", "title", {unique: false})
      store.createIndex("genre", "genre", {unique: false})
      store.createIndex("year", "year", {unique: false})
      store.createIndex("tempo", "year", {unique: false})
      store.createIndex("count", "count", {unique: false})
      store.createIndex("christmas", "christmas", {unique: false})
      store.createIndex("opm", "opm", {unique: false})
    }
  })
}

const populateDb = async () => {
  try {
    const db = await createIndexedDb();
    const transaction = db.transaction(["store"],'readwrite' );
    const objectStore  = transaction.objectStore("store");

    const response = await fetch("test.json");
    if (!response.ok) throw new Error("Unable to fetch");
    const data = await response.json();


    data.data.forEach(async (x: SongDataFromApi, i: number) => {
      if (i > 100 ) return;
      const christmas : boolean = x.Genre?.toUpperCase().includes("CHRISTMAS");
      const opm : boolean = x.Genre?.toUpperCase().includes("OPM");

      const request : IDBRequest<IDBValidKey> = objectStore.add({
        Id: x.Id,
        Artist: x.Artist,
        christmas,
        opm,
        count: x.Count,
        genre: x.Genre,
        tempo: x.Tempo,
        title: x.Title,
        year: x.Year
      })

      transaction.oncomplete = () => {
        console.log("transaction complete");
      }
    })

  }
  catch (e) {
console.log(e);
  }
}




 function Root () {
   const [state, dispatch ] = useData();




  useEffect(()=> {
    const fetchData = async () => { 
      const x = await populateDb();
      console.log("x: ", x);
    }
    fetchData();


    // const fetchData = async () => {

    //   try {
    //     console.log("create");
    //     let db! : IDBDatabase;
       
    //     request.onupgradeneeded = () => {
    //       console.log("onupgradeneeded");
    //       const db = request.result;
    //       const store = db.createObjectStore('store', { keyPath: "Id"});

    //       store.createIndex("Id", "Id", { unique: true})
    //       store.createIndex("Artist", "Artist", {unique: false} )
    //       store.createIndex("title", "title", {unique: false})
    //       store.createIndex("genre", "genre", {unique: false})
    //       store.createIndex("year", "year", {unique: false})
    //       store.createIndex("tempo", "year", {unique: false})
    //       store.createIndex("count", "count", {unique: false})
    //       store.createIndex("christmas", "christmas", {unique: false})
    //       store.createIndex("opm", "opm", {unique: false})




    //       store.transaction.oncomplete = async (event) => {
    //         console.log("dave complete");
    //         const objectStore = db
    //           .transaction("store", 'readwrite')
    //           .objectStore("store")

    //         const response = await fetch("test.json");
    //         if (!response.ok) throw new Error("Unable to fetch data.");
    //         const data = await response.json();

    //         data.data.forEach((x: SongDataFromApi)=> {
    //           const christmas : boolean = x.Genre?.toUpperCase().includes("CHRISTMAS");
    //           const opm : boolean = x.Genre?.toUpperCase().includes("OPM");

    //           objectStore.add({
    //             Id: x.Id,
    //             Artist: x.Artist,
    //             christmas,
    //             opm,
    //             count: x.Count,
    //             genre: x.Genre,
    //             tempo: x.Tempo,
    //             title: x.Title,
    //             year: x.Year
    //           })
    //         })

    //      }
    //     }





        // dispatch({
        //   type: "ADD_SONG",
        //   payload: {
        //     songs: data.data.map((x: SongDataFromApi): Song=> {
        //     const christmas : boolean = x.Genre.toUpperCase().includes("CHRISTMAS");
        //     const opm : boolean = x.Genre?.toUpperCase().includes("OPM");
        //     return {
        //       Id: x.Id,
        //       Artist: x.Artist,
        //       christmas,
        //       opm,
        //       count: x.Count,
        //       genre: x.Genre,
        //       tempo: x.Tempo,
        //       title: x.Title,
        //       year: x.Year
        //     }
        //   })
        // }})
    //   }
    //   catch (e) {
    //     console.error("Error fetching data: ", e);
    //   }
    // }
  
    // fetchData();
  }, []);

  return (
    <div>
        <Header></Header>
        <Body></Body>
    </div>
  )
}

export default Root 