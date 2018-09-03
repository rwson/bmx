import React, {
  Component,
  PureComponent
} from 'react';

import bind from './bind';

/**
 * @param  {State} list 
 */
const connect = (...list) => {
  const stateArray = list.map(obj => bind(obj));
  return (Wrapped) => {
    //  connect只允许传入Componnet组件
    if (!(Wrapped.prototype instanceof Component)) {
      throw new TypeError(`bmx must connect React.Component, not ${Wrapped.prototype.__proto__.constructor.name}`);
    }

    /**
     * 构造高阶组件
     */
    return class Connect extends Component {
      constructor(props) {
        super(props);
        //  生成随机名称
        this.name = `connect-class${Math.random().toString(16)}`
        const fn = this.didStateUpdate;
        stateArray.forEach((item) => {
          item.subscribe({
            fn,
            context: this,
            name: this.name
          });
        });
        this.state = {};
      }

      /**
       * 执行顺序
       * state.didStateUpdate -> Connect.didStateUpdate -> Connect.setState({}) -> Connect.render
       * Connect类中没有重写方法shouldComponentUpdate
       * 默认返回true, 重新渲染
       */
      didStateUpdate() {
        this.setState({});
      }

      //  组件被卸载后, 不再监听didStateUpdate
      componentWillUnmount() {
        stateArray.forEach(item => {
          item.unsubscribe(this.name);
        });
      }

      render() {
        /**
          this.props用于接收调用该组件传入的props

          //  比如下面的调用方式
          // some-component.jsx
          import React, { Component } from 'react';
          import { connect } from 'bmx';
          import someState from './state';
          @connect(someState)
          export default class someComponent extends Component {
              render() {
                return (
                  <div>{ this.props.text }</div>
                );
              }
          }
          
          // some-other-component.jsx
          import React, { Component } from 'react';
          import someComponent from 'path/to/some-component';
          
          export default class someOtherComponent {
              render() {
                return (
                  <div>
                    <someComponent text={'text content'} />
                  </div>
                );
              }
          }
         */

        return <Wrapped { ...this.props
        }
        />;
      }
    };
  };
};

export default connect;