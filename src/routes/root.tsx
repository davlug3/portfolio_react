import Header from '../components/Header/Header'
import Body from "../components/Body/Body"
import { useEffect, useState } from 'react'
import { useData } from '../context/data';

import { db, populate } from "./../db"

export interface SongDataFromApi {
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

function Root () {
    const [loading, setLoading] = useState(true);


    useEffect(()=> {
      const initializeDb = async () => {
        await db.open()
        populate(setLoading);
      }
      initializeDb();
    }, []);

  return (
    <div>
        <Header></Header>
        <Body loading={loading}></Body>
    </div>
  )
}

export default Root 