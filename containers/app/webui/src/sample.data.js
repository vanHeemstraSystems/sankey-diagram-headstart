// See also https://stackoverflow.com/questions/37302958/d3-sankey-minimize-link-crossing

const Data_prod = {
  nodes: [
    // level 1    
    { name: "Microservices", color: "red", url: ":8080" },
    //{ name: "B", color: "yellow", url: "https://www.google.com/search?q=B" },
    //{ name: "C", color: "blue", url: "https://www.google.com/search?q=C" },
    // level 2
    //{ name: "D", color: "green", url: "https://www.google.com/search?q=D" },
    //{ name: "E", color: "purple", url: "https://www.google.com/search?q=E" },
    { name: "Business Process Management (BPM)", color: "yellow", url: ":8081/camunda-welcome/" },
    // level 3
    //{ name: "F", color: "cyan", url: "https://www.google.com/search?q=F" },
    //{ name: "G", color: "yellow", url: "https://www.google.com/search?q=G" },
    { name: "Build Bamboo Plan Worker", color: "blue", url: ":8080" },
    { name: "Business Applications Management (BAM)", color: "brown", url: ":4002" },    
    { name: "Modeler", color: "orange", url: ":8091" },
    { name: "Chat", color: "purple", url: ":7080" },
    { name: "Content Management Systems (CMS)", color: "green", url: ":1436" },
    { name: "Infrastructure Management (IM)", color: "violet", url: ":50" },
    { name: "Knowledge Management (KM)", color: "cyan", url: ":6000" }
    // level 4    
  ],
  links: [
    { source: "Microservices", target: "Build Bamboo Plan Worker", value: 100 },
    { source: "Microservices", target: "Business Applications Management (BAM)", value: 100 }, 
    { source: "Microservices", target: "Business Process Management (BPM)", value: 100 },
    { source: "Business Process Management (BPM)", target: "Modeler", value: 100 },
    { source: "Microservices", target: "Chat", value: 100 },
    { source: "Microservices", target: "Content Management Systems (CMS)", value: 100 },
    { source: "Microservices", target: "Infrastructure Management (IM)", value: 100 },
    { source: "Microservices", target: "Knowledge Management (KM)", value: 100 }    
  ],
  units: "TWh"
};

const Data_dev = {
  nodes: [
    // level 1    
    { name: "Microservices (dev)", color: "red", url: ":8080" },
    //{ name: "B", color: "yellow", url: "https://www.google.com/search?q=B" },
    //{ name: "C", color: "blue", url: "https://www.google.com/search?q=C" },
    // level 2
    //{ name: "D", color: "green", url: "https://www.google.com/search?q=D" },
    //{ name: "E", color: "purple", url: "https://www.google.com/search?q=E" },
    { name: "Business Process Management (BPM)", color: "yellow", url: ":8081/camunda-welcome/" },
    // level 3
    //{ name: "F", color: "cyan", url: "https://www.google.com/search?q=F" },
    //{ name: "G", color: "yellow", url: "https://www.google.com/search?q=G" },
    { name: "Build Bamboo Plan Worker", color: "blue", url: ":8080" },
    { name: "Business Applications Management (BAM)", color: "brown", url: ":4002" },    
    { name: "Modeler", color: "orange", url: ":8091" },
    { name: "Chat", color: "purple", url: ":7080" },
    { name: "Content Management Systems (CMS)", color: "green", url: ":1436" },
    { name: "Infrastructure Management (IM)", color: "violet", url: ":5080" },
    { name: "Knowledge Management (KM)", color: "cyan", url: ":6001" }    
    // level 4    
  ],
  links: [
    { source: "Microservices (dev)", target: "Build Bamboo Plan Worker", value: 100 },
    { source: "Microservices (dev)", target: "Business Applications Management (BAM)", value: 100 },   
    { source: "Microservices (dev)", target: "Business Process Management (BPM)", value: 100 },
    { source: "Business Process Management (BPM)", target: "Modeler", value: 100 },
    { source: "Microservices (dev)", target: "Chat", value: 100 },
    { source: "Microservices (dev)", target: "Content Management Systems (CMS)", value: 100 },
    { source: "Microservices (dev)", target: "Infrastructure Management (IM)", value: 100 },
    { source: "Microservices (dev)", target: "Knowledge Management (KM)", value: 100 }  
  ],
  units: "TWh"
};

const Data = process.env.NODE_ENV === `development` ? Data_dev : Data_prod;

export default Data;
