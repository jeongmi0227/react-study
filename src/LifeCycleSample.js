import React,{Component} from 'react';
 
/*
 모든리액트 컴포넌트에는 라이프사이클이 존재함
 컴포넌트 수명은 페이지에 렌더링되기 전 준비과정에서 시작해서 페이지에서 사라질때 끝남
 
 라이프사이클 메서드 총 10가지
 Will 접두사는 작업 동작전 실행되는 메서드
 Did 접두사는 작업을 작동한후에 실행되는 메서드
 마운트 -> 업데이트 ->언마운트
 
 마운트
 DOM이 생성되고 웹브라우저상에 나타나는것을 마운트라고함
 - 컴포넌트 만들기
 1.constructor : 컴포넌트를 새로 만들때 마다 호출되는 클래스 생성자 메서드
 2.getDerivedStateFromProps : props에 있는 값을 state에 동기화하는 메서드
 3.render : 우리가 준비한 UI를 렌더링하는 메서드
 4.componentDidMount : 컴포넌트가 웹 브라우저상에 나타난후 호출하는 메서드
 
 업데이트 
 컴포넌트를 업데이트할 때 4가지 경우
 1. props가 바뀔때
 2. state가 바뀔때
 3. 부모 컴포넌트가 리렌더링될때
 4. this.forceUpdate로 강제로 렌더링을 트리거할때
 
 - props 변경 or 부모리렌더링
 1. getDerivedStateFromProps : 마운트 과정에서도 호출하며, props가 바뀌어서 업데이트할때도 호출됨
 2. shouldComponentUpdate -> state변경 : 컴포넌트 리렌더링 여부결정하는 메서드 false 일 경우 업데이트 취소
 3. render -> forceUpdate : 컴포넌트 리렌더링
 4. getSnapshotBeforeUpdate : 컴포넌트 변화를 DOM에 반영하기 바로 직전에 호출하는 메서드
 웹브라우상의 DOM변화 
 5. componentDidUpdate : 컴포넌트의 업데이트 작업이 끝난후 호출하는 메서드
 
 언마운트
 마운트의 반대과정, 컴포넌트를 DOM에서 제거하는것
 언마운트하기
 componentWillUnMount : 컴포넌트가 웹브라우저상에서 사라지기 전에 호출하는 메서드
 
 
*/
class LifeCycleSample extends Component{
    state={
        number:0,
        color:null
    }
    myRef=null;
 
    // 생성자 메서드  컴포넌트 만들때 처음으로 실행됨 초기 state를 정할수있음
    constructor(props){
        super(props);
        console.log('constructor');
    }
    // props로 받아온값을 state에 동기화하는 용도로 사용 
    // 컴포넌트를 마운트하거나 props 변경할때 호출
    static getDerivedStateFromProps(nextProps,prevState){
        console.log('getDerivedStateFromProps');
        if(nextProps.color!==prevState.color){
            return{
                color:nextProps.color
            };
        }
        return null;
    }
    // 컴포넌트 만들고 첫 렌더링을 다 마친후 실행
    // 이 안에서 다른자바스크립트 라이브러리 또는 프레임워크 함수 호출 이벤트 등록 비동기작업 처리
    componentDidMount(){
        console.log('componentDidMount');
    }
 
    // props 또는 state를 변경했을때 리렌더링 시작여부 지정하는 메서드
    // true 또는 false 반환
    shouldComponentUpdate(nextProps,nextState){
        console.log('shouldComponentUpdate',nextProps,nextState);
        return nextState.number%10!==4;
    }
 
    // 컴포넌트를 DOM에서 제거할때 실행
    // componentDidMount 에서 등록한 이벤트 타이머, 
    // 직접 생성한 DOM이 있다면 여기서 제거작업실행
    componentWillUnmount(){
        console.log('componentWillUnmount');
    }
    
    handleClick=()=>{
        this.setState({
            number:this.state.number+1
        });
    }
 
    // render메서드 호출후 DOM에 변화를 반영하기 바로 직전에 호출하는 메서드
    // 여기서 반환하는값은 componentDidUpdate에서 snapshot 값으로 전달받을수있음 
    // 주로 업데이트 하기 직전의 값을 참고할때 사용함(스크롤바 위치유지)
    getSnapshotBeforeUpdate(prevProps,prevState){
        console.log('getSnapshotBeforeUpdate');
        if(prevProps.color!==this.props.color){
            return this.myRef.style.color;
        }
        return null;
    }
 
    // 리렌더링 완료후 실행 업데이트가 끝난 직후 DOM 관련 처리 
    // prevProps or prevState를 사용해서 컴포넌트가 이전에 가졌던 데이터 접근가능
    componentDidUpdate(prevProps,prevState,snapshot){
        console.log('componentDidUpdate',prevProps,prevState);
        if(snapshot){
            console.log('업데이트 되기 직전 색상 : ',snapshot);
        }
    }
 
    render(){
        console.log('render');
        const style={
            color:this.props.color
        };
 
        return (
            <div>
                <h1 style={style} ref={ref=>this.myRef=ref}>
                    {this.state.number}
                </h1>
                <p>color:{this.state.color}</p>
                <button onClick={this.handleClick}>더하기</button>
            </div>
        )
    }
}
export default LifeCycleSample;


