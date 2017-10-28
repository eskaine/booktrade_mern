import {setAuth} from './auth';
import {setName, setCity, setState} from './userDetails';
import counters from './counters';
import lists from './lists';

const Actions = {
    setAuth: setAuth,
    setName: setName,
    setCity: setCity,
    setState: setState,
    counters: counters,
    lists: lists
}

export default Actions;
