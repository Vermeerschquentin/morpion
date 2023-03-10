import logo from './logo.svg';
import './App.css';
import React from 'react';
class App extends React.Component{
  constructor(props){
  super(props);
  this.state = {
    Global: [["","","","","","","","",""]],
    actu: ["","","","","","","","",""],
    etat: false,
    J : '',
    bouton : "",
    divBouton : [],
    old : '',
    construction : [''],
    P : "",
    S : <button onClick={()=>this.start()}>commencer le jeu</button>,
    oldG : []
  };
  }

  count(tab,elem){
    let compteur =0;
    for (let i=0;i<tab.length;i++){
      elem == tab[i] ? compteur = compteur+1 : i=i;
    }
    return(compteur)
  }

  Win(){
    let bool = false;
    for (let i=0;i<3;i++){
      if(this.state.actu[i*3] === this.state.actu[i*3+1] && this.state.actu[i*3] === this.state.actu[i*3+2] && this.state.actu[i*3]!=''){
        bool = true;
      }
      if(this.state.actu[i] === this.state.actu[i+3] && this.state.actu[i] === this.state.actu[i+6]&& this.state.actu[i]!=''){
        bool = true;
      }
    }
    if(this.state.actu[0] === this.state.actu[4] && this.state.actu[0] === this.state.actu[8]&& this.state.actu[0]!=''){
      bool = true;
    }
    if(this.state.actu[2] === this.state.actu[4] && this.state.actu[2] === this.state.actu[6]&& this.state.actu[2]!=''){
      bool = true;
    }
    bool ? this.setState({P: <p>{this.state.old} a gagné</p>})  : this.setState({P: <p>au tour de {this.state.J}</p>});
    return bool;
  }

    
  desc (){
    this.state.old = this.state.J;
    let toutJ = ['O','X'];
    let nbr = this.count(this.state.actu,"")%2;
    this.state.J = toutJ[nbr];
    this.setState({J : toutJ[nbr]});
    this.setState({etat : this.Win()});
    
  }
  Tour(x){
    if (this.state.actu[parseInt(x)]== "" && ! this.state.etat){
      this.state.actu[x] = this.state.J;
      this.desc(x);
      let g2 = this.state.Global;
      g2.push(this.state.actu.slice());
      this.setState({Global: g2});
      g2 = this.state.divBouton;
      g2.push(g2.length+1);
      this.setState({divBouton: g2});
      this.constru();
    }
  }
    
  retour (x){
    let g = this.state.Global[x];
    this.state.actu = g;
    this.setState({actu : g});
    this.desc();
    let newglobal=[["","","","","","","","",""]];
    let g2 = [];
    this.setState({divBouton: g2});
    for (let i=0;i<x;i++){
      newglobal.push(global[i]);
      g2.push(g2.length+1);
    }
    this.setState({Global : newglobal});
    this.state.divBouton = g2;
    this.setState({divBouton: g2});
    this.constru();
    
  }
  
  constru(){ 

    this.setState({construction : [0,1,2].map((x)=><ul>{[1,2,3].map((y)=><li onClick={()=>this.Tour(x*3+y-1)}>{this.state.actu[[x*3+y-1]]}</li>)}</ul>)})
    this.setState({bouton : this.state.divBouton.map((x)=><button onClick ={()=>this.retour(x-1)} >tour {x}</button>)})
  }
  start(s){
    this.constru();
    this.setState({J : 'X'})
    this.setState({P : <p>au tour de X</p>});
    this.setState({S : ""});
  }

  render(){
    return(
      <div className = 'all'>
      <div>
        {this.state.S}
        {this.state.P}
        {this.state.construction}
      </div>
      <div>
        {this.state.bouton}
      </div>
      </div>
    )
  }
}

export default App;
