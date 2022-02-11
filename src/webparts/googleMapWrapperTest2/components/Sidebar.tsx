import * as React from "react";
import './Sidebar.css';

// export function SideBar(props) {
    export const SideBar = (props) =>{
   
    
      var sidebarClass = props.isOpen ? 'sidebar open' : 'sidebar';
      var toogleBtnClass = props.isOpen ? 'sidebar-toogle' : 'sidebar-toogle-closed';
      return (
        <div className={sidebarClass}>
            <div>I slide into view</div>
                  <div>Me too!</div>
            <div>Meee Threeeee!</div>
          <button onClick={props.toggleSidebar} className={toogleBtnClass}>Close Sidebar</button>
          </div>
      );
    
  }