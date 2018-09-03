import isEqual from 'lodash.isequal';

class State {

  state = {}

  computed = {}

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
        ...nextState
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

}

export default State;