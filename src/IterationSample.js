
import React,{Component} from 'react';
 
class IterationSample extends Component{
    /*
    setState 메서드로 수정할경우 push가 아닌 concat으로 새배열 추가
    push 사용할경우 기존 배열자체가 변형이됨 */ 
 
    state={
        names:['눈사람','얼음','눈','바람'],
        name:''
    }
    handleChange=(e)=>{
        this.setState({
            name:e.target.value
        });
    }
    handleInsert=()=>{
        this.setState({
            names:this.state.names.concat(this.state.name),
            name:''
        })
    }
 
    handleRemove=(index)=>{
        const {names}=this.state;
        /*배열을 자르는 내장함수 slice와 전개연산자(...)를 사용하여
        index번째 값을 제외한 값들을 배열에 넣어줍니다.*/ 
        this.setState({
            names:[...names.slice(0,index),
                   ...names.slice(index+1,names.length)]
 
        // filter로 index번째를 제외한 원소만 있는 새 배열 생성
        // names:names.filter((item,i)=>i !==index)
        });
    }
 
    render(){
        const nameList=this.state.names.map(
            (name,index)=>(<li key={index} onDoubleClick={()=>this.handleRemove(index)}>{name}</li>)
        );
 
        return (
            <div>
                <input 
                onChange={this.handleChange}
                value={this.state.name}/>
                <button onClick={this.handleInsert}>추가</button>
            <ul>
                {nameList}
            </ul>
            </div>            
        )
    }
}
export default IterationSample;