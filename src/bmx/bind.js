const bind = (state) => {
  let bmxState = state.didStateUpdate.bmxState;
  if (!bmxState) {
    bmxState = {
      topics: [],
      subscribe(obj) {
        this.topics.push(obj);
        return this;
      },
      unsubscribe(name) {
        this.topics = this.topics.filter((topic) => {
          return topic.name !== name;
        });
        return this;
      },
    };

    //  缓存state中的didStateUpdate
    const didStateUpdate = state.didStateUpdate.bind(state);

    state.didStateUpdate = (...args) => {
      //  state中的didStateUpdate
      didStateUpdate(...args);
      //  挨个执行Connect中添加的didStateUpdate
      bmxState.topics.forEach(({
        fn,
        context
      }) => {
        fn.call(context);
      });
    };
    state.didStateUpdate.bmxState = bmxState;
  }
  return bmxState;
};

export default bind;