// import { State } from './bbx-source';
import { State } from 'bmx';

class AppState1 extends State {
    state = { 
        state1: 'state1',
        state2: 'state2',
        firstName: 'rw',
        lastName: 'son'
    }

    changeState(state) {
        this.setState({
            [state]: Math.random().toString(16)
        });
    }
}

const appState1 = new AppState1();

export default appState1;
