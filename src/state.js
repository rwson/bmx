// import { State } from './bbx-source';
import { State } from './bmx';

let count = 0;

class AppState1 extends State {
    constructor() {
        super();
        this.state = { 
            state1: 'state1',
            state2: 'state2',
            firstName: 'rw',
            lastName: 'son'
        };
        this.computed = {
            name(state) {
                return state.firstName + state.lastName;
            }
        }
        console.log(this);
    }

    changeState(state) {
        this.setState({
            [state]: Math.random().toString(16)
        });
    }

    didStateUpdate() {
        console.log('updated');
    }
}

const appState1 = new AppState1();

export default appState1;
