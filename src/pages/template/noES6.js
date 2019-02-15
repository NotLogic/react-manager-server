import createReactClass from 'create-react-class'

let MyComponent = createReactClass({

  render: function(){
    return (
      <div>我的组件</div>
    );
  }
})
export default MyComponent
// 不使用ES6创建组件与使用ES6创建组件的区别：

// 1. 声明默认属性
// 如果使用（ES6）class关键字创建组件，可以直接把自定义属性对象写到类的defaultProps属性中：
// class Greeting extends React.Component { ... }
// Greeting.defaultProps = { name: 'Mary' }
// 如果使用createReactClass 方法创建组件，那就需要在参数对象中定义getDefaultProps方法，并且在这个方法中返回包含自定义属性的对象：
// var Greeting = createReactClass({
//    getDefaultProps:  function(){  return { name: 'Mary' } }
// })

// 2. 设置初始状态
// 如果使用class关键字创建组件，你可以通过在constructor中给this.state赋值的方式来定义组件的初始状态：
// class Counter extends React.Component {
//    constructor(props){
//      super(props);
//      this.state = { count: props.initialCount }
//    }
// }
// 如果使用createReactClass方法创建，需要多写一个getInitialState方法，并让这个方法返回需要定义的初始属性：
// var Counter = createReactClass({
//    getInitialState: function(){
//      return { count: this.props.initialCount }
//    }
// })

// 3.  自动绑定
//  对于使用class关键字创建的React组件，组件中的方法是不会自动绑定this的。类似地，通过ES6 class生成的实例，实例上的方法也不会绑定this。
// 因此需要通在constructor中为方法手动添加.bing(this)
// class SayHello extends React.Component {
  //  constructor(props){
    // super(props);
    // this.state = { message: 'hello' }
    // this.handleClick = this.handleClick.bind(this)
  // } 
  // handleClick(){
    // alert(this.state.message)
  // }
  // render () {
    // return (<button onClick={this.handleClick}>Say Hello</button>);
  // }
// }
// 如果使用createReactClass方法创建组件，组件中的方法会自动绑定至实例，需要像上面那样加.bind(this)：
// var SayHello = createReactClass({
  // getIninialState: function(){
    // return { message: 'Hello' }
  // },
  // handleClick(){ alert(this.state.message) },
  // render: function(){
  //   return (<button onClick={this.handleClick}>Say Hello</button>);
  // }
// })
// 这意味着，如果使用class关键字创建租价，那在处理事件回调的时候就要多写一点代码。但对于大型项目来说，这样做可以提升效率
// 如果觉得上面的写法很麻烦，可以尝试一下 目前还处于实验阶段 的Babel插件Class Properties
// class SayHello extends React.Component {
//   constructor(props){
//     super(props);
//     this.state = { message: 'hello' }
//   }
//   // 警告：这种语法还处于实验性阶段
//   // 在这里使用箭头函数就可以吧方法绑定给实例
//   handleClick = () => {
//     alert(this.state.message)
//   }
//   render(){
//     return (<button onClick={this.handleClick}></button>);
//   }
// }
// 请注意，这种语法目前还处于实验性阶段。这也意味着，语法随时都可能改变。当然，也存在最终没有被官方批准的可能。
// 为了保险起见，一下三种做法都是可以的：
// 1) 把方法绑定给构造器 constructor
// 2) 使用箭头函数
// 3) 使用createReactClass

// 3. 混入
// 注： ES6本身是不包含混入支持的。因此如果使用class关键字创建组件，那就不能使用混入功能了。
// 也有很多使用了混入，然后出现问题的代码库，因此，并不推荐在ES6中使用混入
// 一下内容仅供参考
// 如果完全不同的组件有相似的功能，这就会产生“横切关注点”问题。
// 针对这个问题，在使用createReactClass创建React组件的时候，引入混入功能会是一个很好的解决方案
// 一个常见的使用场景是，当一个组件想要每隔一段时间更新，那么最简单的方法就是使用setInterval()。
// 但是更重要的是，如果在后续代码中不需要这个功能，为了节省内存，需要把它删除。
// React提供了生命周期方法，这样，你可以知道某一个组件什么时候要被创建或者什么时候会被销毁。
// 创建一个使用setInterval()的混入，它会在组件销毁的时候也销毁
// var SetIntervalMixin = {
//   componentWillMount: function(){
//     this.intervals = []
//   },
//   setInterval: function(){
//     this.intervals.push(setInterval.apply(null, arguments))
//   },
//   componentWillUnmount: function(){
//     this.intervals.forEach(clearInterval)
//   }
// }
// var TickTock = createReactClass({
//   mixins: [SetIntervalMixin], // 使用混入
//   getInitialState: function(){
//     return { seconds: 0 }
//   },
//   componentDidMount: function(){
//     this.setInterval(this.tick, 1000) // 调用混入方法
//   },
//   tick: function(){
//     this.setState({seconds: this.state.seconds + 1})
//   },
//   render: function(){
//     return (<p>
//       React has been running for {this.state.seconds} seconds.
//     </p>)
//   }
// })
// 如果一个组件有多个混入，且其中几个混入定义了相同的生命周期方法，那么这些生命周期方法是一定会被调用的。
// 通过混入定义的方法，执行顺序也与定义时的顺序一致，且会在组件上的方法执行之后再执行