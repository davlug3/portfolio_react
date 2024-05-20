import Dexie, { IndexableTypeArray, Table }  from "dexie";
import { Song } from "./context/data";
import { SongDataFromApi } from "./routes/root";



export class MySubClassedDexie extends Dexie {
    songs!: Table<Song>;

    constructor() {
        super("myDatabase");
        this.version(2).stores({
            songs: "Id, Artist, christmas, opm, count, genre, tempo,title, year"
        })
    }


    async getDistinctGenres() : Promise<string[]> {
        const keys: IndexableTypeArray = await this.songs.orderBy("genre").uniqueKeys();
        const genres  : string[] = keys.filter((key): key is string => typeof key ==='string');
        return  genres;
    }

    async getDistinctYears() : Promise<string[]> {
        const keys: IndexableTypeArray = await this.songs.orderBy("year").uniqueKeys();
        const genres  : string[] = keys.filter((key): key is string => typeof key ==='string');
        return  genres;
    }

    async getDistinctTempos() : Promise<string[]> {
        const keys: IndexableTypeArray = await this.songs.orderBy("tempo").uniqueKeys();
        const genres  : string[] = keys.filter((key): key is string => typeof key ==='string');
        return  genres;
    }
}

export const db= new MySubClassedDexie();



export async function populate (setLoading: (loading: boolean)=> void) {
    if (!(await db.songs.count())) {
        const res = await fetch("test.json")
        const data = await res.json()

        if (Array.isArray(data?.data)) {
            setLoading(true);
            db.songs.bulkAdd(
                data.data
                .filter((x: unknown, i: number) => (i> 10))
                .map((x: SongDataFromApi ) => {
                    const christmas : boolean = x.Genre?.toUpperCase().includes("CHRISTMAS");
                    const opm : boolean = x.Genre?.toUpperCase().includes("OPM");
                    return  {
                        Id: x.Id,
                        Artist: x.Artist,
                        christmas,
                        opm,
                        count: x.Count,
                        genre: x.Genre,
                        tempo: x.Tempo,
                        title: x.Title,
                        year: x.Year, 
                    }
                })
            )
        }
    }
    setLoading(false);
}



// export function resetDatabase () {
//     return db.transaction('rw', db.songs, async () => {
//         await Promise.all(db.songs.map())
//     } )
// }