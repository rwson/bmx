// import { State } from './bbx-source';
import { State, computed } from './bmx';

class AppState1 extends State {

    state = {
        state1: 'state1',
        state2: 'state2',
        firstName: 'rw',
        lastName: 'son'
    }

    @computed
    fullName() {
        return this.state.firstName + this.state.lastName;
    }

    changeState(state) {
        this.setState({
            [state]: Math.random().toString(16)
        });
        console.log(this.computed);
    }

    didStateUpdate() {
        console.log('updated');
    }
}

const appState1 = new AppState1();

export default appState1;
