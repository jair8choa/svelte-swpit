import {writable} from 'svelte/store'

const create = ()=>{
    const {subscribe, set} = writable(null)

    return {
        subscribe,
        login: (arg)=>{
            set(arg)
        },
        logout: ()=> set(null)
    }
}

export const user = create()