import React from 'react';
import { Helmet } from 'react-helmet';
import './App.css';

function App() {

  const handleClick = (event) => {
    var target = event.target;
    console.log('A link was clicked', target);
    if (target.tagName.toLowerCase() == 'a')
    {
      var href = target.getAttribute('href');
      console.log("href = ", href);
      var port = target.getAttribute('href').match(/^:(\d+)(.*)/);
      console.log("port = ", port);
      if (port)
      {
         target.href = port[2];
         target.port = port[1];
      }
    }
  };

  React.useEffect(() => {
    // See also https://www.pluralsight.com/guides/event-listeners-in-react-components
    // Delegate event for performance, and save attaching a million events to each anchor
    // Example: http://jsfiddle.net/JtF39/79/
    // Usage:
    // <a href=":8080/test/blah">Test absolute</a>
    // <a href=":7051./test/blah">Test relative</a>
    window.addEventListener('click', handleClick, false);

    // cleanup this component
    return () => {
      window.removeEventListener('click', handleClick);
    };

  }, []);

  return (
    <div className="App">
      <Helmet>
        <title>Microservices</title>
        <script type="text/javascript">{`
          {}
        `}</script>
        <style>{`
          a, a:hover, a:focus, a:active {
            text-decoration: none;
            color: inherit;
          },
          .menu ul, .menu li {
            margin: 0;
            padding: 0;
            list-style-type: none;
            display: inline-block;
            text-align: left;
          }
        `}</style>
      </Helmet>
      <header className="App-header">
        Welcome to Microservices Gateway
        <div className="menu">
          <ul>
            <li><a href=":8081">Web</a></li>
            <li><a href=":8081">Build Bamboo Plan Worker</a></li>
            <li><a href=":8090/camunda-welcome/">Business Process Management (BPM)</a></li>
            <li><a href=":8091">Business Process Management (BPM) Modeler</a></li>
            <li><a href=":7080">Chat</a></li>
            <li><a href=":1436">Content Management Systems (CMS)</a></li>
            <li><a href=":5080">Infrastructure Management (IM)</a></li>
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
