import {setAuth} from './auth';
import {setName, setCity, setState} from './userDetails';
import counters from './counters';

const Actions = {
    setAuth: setAuth,
    setName: setName,
    setCity: setCity,
    setState: setState,
    setApprovals: counters.setApprovals,
    incApprovals: counters.incApprovals,
    decApprovals: counters.decApprovals,
    setRequests: counters.setRequests,
    incRequests: counters.incRequests,
    decRequests: counters.decRequests
}

export default Actions;
