import { useEffect, useState } from "react";
import { Property } from "@/declarations/Property_backend/Property_backend.did";
import { PaginationQuery } from "@/declarations/Property_backend/Property_backend.did";
import { Separator } from "@radix-ui/react-select";

type StringifiedProperty = {
  [K in keyof Property]: string;
};

interface PropertyQuery extends StringifiedProperty{
  [key: string]: string;
}

interface FilterProps{
  page: number;
  count: number;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setQuery: (query: PaginationQuery) => void;
  showFilters: boolean;
  goSearch: boolean;
  setGoSearch: (go: boolean) => void;
  selectedCategory: string; // least specific category
}

const numsAttrs: (keyof Property)[] = ["bathroomCount", "bedCount", "bedroomCount", "guestCapacity"]; // attributes that are queryable
const textsAttrs: (keyof Property)[] = ["builtInDate", "description", "location", "name", "owner"]; // attributes that are queryable


const PropertyFilter: React.FC<FilterProps> = ({count, page, searchTerm, setSearchTerm, selectedCategory, setQuery, showFilters, goSearch, setGoSearch})=>{  
    const createEmptyProps = (): PropertyQuery => {
      const emptyProps: any = {};
      const allKeys = [...numsAttrs, ...textsAttrs];
      allKeys.forEach(key => {
        emptyProps[key as string] = '';
      });
      return emptyProps as PropertyQuery;
    };  
  
    const [prop, setProp] = useState<PropertyQuery>(createEmptyProps());
    const [currSearch, setCurrSearch] = useState<"name"|"owner"|"description"|"location">("name");
    const [sortBy, setSortBy] = useState<keyof Property>("name");
    const [orderBy, setOrderBy] = useState<"asc"|"desc">("asc");


    useEffect(() => {
      switch(currSearch) {
        case "location":
          setProp(prev => ({...prev, location: searchTerm}));
          break;
        case "owner":
          setProp(prev => ({...prev, owner: searchTerm}));
          break;
        case "description":
          setProp(prev => ({...prev,description: searchTerm}));
          break;
        default:
          setProp(prev=> ({...prev, name: searchTerm}));
          break;
      }
    }, [searchTerm]);

    // hooks

    useEffect(()=>{
      setSearchTerm(
        currSearch === "location" ?     prop['location'] :
        currSearch === "owner" ?        prop['owner'] :
        currSearch === "description" ?  prop['description'] : 
                                        prop['name']
      );
    },[currSearch]);

    useEffect(()=>{
      setQuery(repackPropertyToQuery(prop));
    },[goSearch, selectedCategory]);

    //functions
    const repackPropertyToQuery = (property: PropertyQuery): PaginationQuery =>{
        let keys = Object.keys(property);
        let textAttrs:string = "";
        let textQueries:string = "";
        let numAttrs: string = ""; 
        let numQueries: string = ""; 
        let comparisons: string = "";
      
        keys.forEach((key)=>{
          if(prop[key].length > 0){
            if(textsAttrs.includes(key as keyof Property)){
              textAttrs += `${key},`;
              textQueries += `${prop[key]},`;
            }else if(numsAttrs.includes(key as keyof Property) ){
              numAttrs += `${key},`;
              numQueries += `${prop[key]},`;
              comparisons += `mt,`;
            }
          }
        })

        if(isPropertyType(selectedCategory)){
          textAttrs += "propertyType,";
          textQueries += `${selectedCategory},`;
        }

        textAttrs += "status,";
        textQueries += "available,";

        return {
          textAttrs: textAttrs,
          textQueries: textQueries,
          numAttrs: numAttrs,
          numQueries: numQueries,
          comparisons: comparisons,
          orderAttr: sortBy,
          orderDir: orderBy,
          page: BigInt(page),
          count: BigInt(count)
        } as PaginationQuery;
    };

    const isPropertyType = (type:string): boolean =>{
      return ["house", "apartment", "villa", "cabin", "camping", "bungalow", "chalet"].includes(type);
    }

    return(
          <div className={`absolute ${showFilters ? "block" : "hidden"} z-50 right-0 bg-white p-4 rounded-lg shadow-md border border-gray-200`}>
              <h3 className="text-lg font-medium mb-3 flex justify-between items-center select-none">Filter Properties <span className="font-light text-sm cursor-pointer">Sort <span className="text-blue-600" onClick={()=>setOrderBy(prev => prev==="asc" ? "desc" : "asc")}>{orderBy==="asc" ? "ascending" : "descending"}</span> by {sortBy}</span></h3>
              <div className="space-y-3">

            <div className="flex items-center gap-2">
                <button 
                onClick={() => {setCurrSearch("name"); setSortBy("name")}}
                className={`px-3 py-1.5 bg-white border rounded-md shadow-sm transition-all duration-200 hover:shadow-md ${prop.name.length > 0 ? 'border-blue-500 text-blue-600 font-medium' : 'border-gray-300 text-gray-700 hover:border-gray-400'}`}>
                Name
                </button>
                <button 
                onClick={() => {setCurrSearch("location"); setSortBy("location")}}
                className={`px-3 py-1.5 bg-white border rounded-md shadow-sm transition-all duration-200 hover:shadow-md ${prop.location.length > 0 ? 'border-blue-500 text-blue-600 font-medium' : 'border-gray-300 text-gray-700 hover:border-gray-400'}`}>
                Location
                </button>
                <button 
                onClick={() => {setCurrSearch("description"); setSortBy("description")}}
                className={`px-3 py-1.5 bg-white border rounded-md shadow-sm transition-all duration-200 hover:shadow-md ${prop.description.length > 0 ? 'border-blue-500 text-blue-600 font-medium' : 'border-gray-300 text-gray-700 hover:border-gray-400'}`}>
                Description
                </button>
                <button 
                onClick={() => {setCurrSearch("owner"); setSortBy("owner")}}
                className={`px-3 py-1.5 bg-white border rounded-md shadow-sm transition-all duration-200 hover:shadow-md ${prop.owner.length > 0? 'border-blue-500 text-blue-600 font-medium' : 'border-gray-300 text-gray-700 hover:border-gray-400'}`}>
                Owner Principal
                </button>
            </div>
            <div className="">
              <label htmlFor="" className="block text-lg mb-3 select-none">Minimal Amenities</label>
              <div className="flex flex-col flex-wrap pl-5 gap-2">
                <div className="border border-gray-300 rounded-md px-2 py-1 w-full flex justify-between items-center"
                  onClick={()=>setSortBy("guestCapacity")}
                >
                  <label htmlFor="guestCapacity" className="text-sm select-none">Guest Capacity</label>
                  <input
                  type="number"
                  id="guestCapacity"
                  value={prop['guestCapacity']}
                  onChange={(e)=> setProp(prev=>({...prev, guestCapacity: e.target.value}))}
                  className="w-10 px-2 py-1 text-center bg-white border border-gray-300 rounded-md appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div className="border border-gray-300 rounded-md px-2 py-1 w-full flex justify-between items-center"
                  onClick={()=>setSortBy("bedroomCount")}
                >
                  <label htmlFor="bedroomCount" className="text-sm select-none">Bedroom Count</label>
                  <input
                  type="number"
                  id="bedroomCount"
                  value={prop['bedroomCount']}
                  onChange={(e)=> setProp(prev=>({...prev, bedroomCount: e.target.value}))}
                  className="w-10 px-2 py-1 text-center bg-white border border-gray-300 rounded-md appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div className="border border-gray-300 rounded-md px-2 py-1 w-full flex justify-between items-center"
                  onClick={()=>setSortBy("bedCount")}
                >
                  <label htmlFor="bedCount" className="text-sm select-none">Bed Count</label>
                  <input
                  type="number"
                  id="bedCount"
                  value={prop['bedCount']}
                  onChange={(e)=> setProp(prev=>({...prev, bedCount: e.target.value}))}
                  className="w-10 px-2 py-1 text-center bg-white border border-gray-300 rounded-md appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div className="border border-gray-300 rounded-md px-2 py-1 w-full flex justify-between items-center"
                  onClick={()=>setSortBy("bathroomCount")}
                >
                  <label htmlFor="bathroomCount" className="text-sm select-none">Bathroom Count</label>
                  <input
                  type="number"
                  id="bathroomCount"
                  value={prop['bathroomCount']}
                  onChange={(e)=> setProp(prev=>({...prev, bathroomCount: e.target.value}))}
                  className="w-10 px-2 py-1 text-center bg-white border border-gray-300 rounded-md appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>
            </div>
            <button 
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
              onClick={()=> setGoSearch(!goSearch)}
            >
                Apply Filters
            </button>
              </div>
          </div>
    )
}

export default PropertyFilter;