// import {API} from '../../../config'


// export const signup
export const authenticate=(data)=>{
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data));
        
    }
}

export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return false;
    }
};

export const signout=()=>{
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt');
    }
}