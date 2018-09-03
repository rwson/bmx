# bmx

---

### 基础使用:

- 状态定义

```javascript
//  some-state.js
import { State } from 'path/to/bmx';
class SomeState extends State {
  state = {
    time: (new Date()).getTime()
  }

  update() {
    this.setState({
      time: (new Date()).getTime()
    });
  }
}
const someState = new SomeState;
export default someState;
```

- 使用该状态

```javascript
//  app.jsx
import React, { Component } from 'react';
import { connect } from 'path/to/bmx';
import someState from 'path/to/some-state';

@connect(someState)
export default class App extends Component {
  clicked() {
    someState.update();
  }

  render() {
    return (
      <div className='app-container'>
        <p>{someState.state.time}</p>
        <button onClick={this.clicked.bind(this)}>更新时间</button>
      </div>
    );
  }
}
```

### 高级用法

如果你不想在每次`state`发生改变就重新渲染, 而是某些状态发生改变再进行渲染, 可以用提供的`watch`装饰器进行连接来制定一些规则控制`render`执行时的前置条件

- 状态定义
```javascript
//  some-state.js
import { State } from 'path/to/bmx';
class SomeState extends State {
  state = {
    time: (new Date()).getTime(),
    time16: (new Date()).getTime().toString(16),
    time32: (new Date()).getTime().toString(32)
  }
}
const someState = new SomeState;
export default someState;
```

- 使用该状态

```javascript
//  app.jsx
import React, { Component } from 'react';
import { connect, watch } from 'path/to/bmx';
import someState from 'path/to/some-state';

@connect(someState)
@watch(() => {
  return [
    someState.state.time16
  ];
})
export default class App extends Component {
  render() {
    return (
      <div className='app-container'>
        <p>{someState.state.time}</p>
        <p>{someState.state.time16}</p>
        <p>{someState.state.time32}</p>
      </div>
    );
  }
}
```

这样改写完之后, 就只有在`someState.state.time16`发生改变之后才会进行`render`调用
