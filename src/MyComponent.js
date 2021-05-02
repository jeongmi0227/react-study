import React,{Component} from 'react';
import PropTypes from 'prop-types';
 
 
class MyComponent extends Component{
    static defaultProps={
        name:'기본이름'
    }
    static propTypes={
        name:PropTypes.string,
        age: PropTypes.number.isRequired
    }
    state={
        number:0
    }
    render(){
        return(
            <div>
                <p>안녕하세요, 제 이름은 {this.props.name} 입니다.</p>
                <p>저는 {this.props.age}살 입니다.</p>
                <p>숫자 : {this.state.number}</p>                
                <button onClick={()=>{
                    this.setState({
                        number:this.state.number+1
                    })
                }}>더하기</button>
            </div>
        )
    }
}
// function () 을 사용했을때는 자신이 종속된 객체의 this를 가리키고
// () => 화살표 함수는 자신이 종속된 인스턴스를 가리킨다.
// 화살표함수는 값을 연산하여 바로 반환해야할때 사용하면 가독성이 높아진다.
 
 
export default MyComponent;
 