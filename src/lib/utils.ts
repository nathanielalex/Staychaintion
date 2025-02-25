import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function delay<T>(cb: () => T, ms: number): Promise<T>{
  return new Promise((resolve, reject) => {
    try {
      setTimeout(()=>{
        resolve(cb()) 
      }, ms)
    } catch(err){
      reject(err)
    }
  })
}