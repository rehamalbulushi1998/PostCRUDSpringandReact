import React from 'react';
import axios from "axios";
class App extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      posts:[],
      id:0,
      title:'',
      desc:'',
      category:''
    }

  }
  componentDidMount(){
    axios.get("http://localhost:8080/api/")
    .then((res)=>{
      this.setState({
        posts:res.data,
        id:0,
        title:'',
        desc:'',
        category:''
      })
    })
  }
  submit(event,id){
    event.preventDefault();
    if(id === 0){
      axios.post("http://localhost:8080/api/",{
        title:this.state.title,
        desc:this.state.desc,
        category:this.state.category
      })
      .then((res)=>{
        this.componentDidMount();
      })
    }else{
      axios.put("http://localhost:8080/api/",{
        id:this.state.id,
        title:this.state.title,
        desc:this.state.desc,
        category:this.state.category
      }).then(()=>{
        this.componentDidMount();
      })

    }

  }
  delete(id){
    axios.delete(`http://localhost:8080/api/${id}`)
    .then(()=>{
      this.componentDidMount();
    })
  }
  edit(id){
    axios.get(`http://localhost:8080/api/${id}`)
    .then((res)=>{
      console.log(res.data);
      this.setState({
        id:res.data.id,
        title:res.data.title,
        desc:res.data.desc,
        category:res.data.category
      })
    })
  }
  render(){
  return (
    <div className="container" >
    
    <div className="row">
    <div className="col s6">
        <form onSubmit={(e)=>this.submit(e,this.state.id)}>
          <h1>Create a Post</h1>
        <div class="input-field col s12">
   
          <input onChange={(e)=>this.setState({title:e.target.value})} value={this.state.title} type="text" id="autocomplete-input" class="autocomplete" />
          <label for="autocomplete-input">Title</label>
        </div>
        <div class="input-field col s12">
   
          <textarea onChange={(e)=>this.setState({desc:e.target.value})} value={this.state.desc} type="text" id="autocomplete-input" class="autocomplete" ></textarea>
          <label for="autocomplete-input">Description</label>
        </div>
        <div class="input-field col s12">
   
          <input onChange={(e)=>this.setState({category:e.target.value})} value={this.state.category} type="text" id="autocomplete-input" class="autocomplete" />
          <label for="autocomplete-input">Category</label>
        </div>
        <button class="btn waves-effect waves-light right" type="submit" name="action">Submit
        </button>
        </form>
      </div>
      <div className="col s6">
      <table>
        <thead>
          <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Category</th>
              <th>Edit</th>
              <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {
            this.state.posts.map(post=>
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.desc}</td>
                <td>{post.category}</td>
                <td>
                <button onClick={(e)=>this.edit(post.id)} class="btn waves-effect waves-light" type="submit" name="action">
              
                </button>
                </td>
                <td>
                <button onClick={(e)=>this.delete(post.id)} class="btn waves-effect waves-light" type="submit" name="action">
  
                </button>
                </td>
              </tr>
              )
          }
          
        </tbody>
      </table>
      </div>
    
    </div>
    </div>
  );
  }
}

export default App;
