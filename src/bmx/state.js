import isEqual from 'lodash.isequal';
import { typeOf } from './util';

class State {

  /**
   * 更新store里的state
   * @param {Object} nextState  新的state
   */
  setState(nextState = {}) {
    //  触发willStateUpdate钩子
    this.willStateUpdate(nextState);

    //  对比判断是否需要更新状态
    const update = this.shouldStateUpdate(nextState);

    //  需要更新就合并新老状态
    if (update === true) {
      const prevState = this.state;
      this.state = {
        ...prevState,
        ...nextState,
      };

      //  触发didStateUpdate, 更新视图
      this.didStateUpdate(prevState);
    }
  }

  willStateUpdate() {}

  /**
   * 判断是否需要更新state
   * @param {Object} nextState 
   */
  shouldStateUpdate(nextState) {
    const { state } = this;
    //  借用lodash来判断前后state是否相同
    return !(isEqual(state, nextState));
  }

  didStateUpdate() {}

  initComputed() {
    const keys = Object.keys(this.computed),
      { state } = this;
    let val, valFn;
    console.log(this.computed);
    
    keys.forEach((key) => {
      val = this.computed[key];
      if (typeOf(val) === 'function') {
        valFn = val;
        val = valFn.call(this, this.state);
      } else {
        throw new TypeError(`State's computed property ${key} excepted to be a function, not ${typeOf(val)}`);
      }
      console.log(this);
      Object.defineProperty(this.computed, key, {
        value: val,
        configurable: false,
        get: () => {
          // console.log(this);
          
          return valFn.call(this, this.state);
        }
      });
    });
  }
}

export default State;