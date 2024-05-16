import Dexie, { Table }  from "dexie";
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
}

export const db= new MySubClassedDexie();


db.on("populate", populate)

db.open().then(function(db) {
    console.log("sdf", db);
}).catch(function (db) {
    console.log("db: ", db);
})

export async function populate () {
    console.log("sdfsdfds", await db.songs.count());
    if (!(await db.songs.count())) {
        console.log(113123);
        console.log("fetching...");
        const res = await fetch("test.json")
        const data = await res.json()
            console.log("done.");

        if (Array.isArray(data?.data)) {
            console.log("dave");

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
}



// export function resetDatabase () {
//     return db.transaction('rw', db.songs, async () => {
//         await Promise.all(db.songs.map())
//     } )
// }