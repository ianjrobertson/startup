# CS 260 Notes

## Git Assignment

I learned a lot about git commands which was helpful. Simulation the merge conflict was a good practice.

https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax

Command for deploying to server ./deployFiles.sh -k ../Ian-Laptop.pem -h ianjrobertson.click -s starup


9/28/2024
In this deliverable, I created the skeleton of my startup webpage. I created a landing page with a header and login. I added navigation and pages for all the different elements of the page. 

I implemented the basic design of my webpage I created for the first deliverable. My websocket will be implemeted by a notifications page. My database will hold persistent data for the posts and userinfo. I will use a third party map API to handle location logic. 

## Midterm Review Notes:
# Questions:
  - In the following code, what does the link element do?
      - <link> defines the relationship between a doucment and an external resource, usually a stylesheet
  - In the following code,  what does a div tag do?
      - <div> usually is a container element
  - In the following code, what is the difference between the #title and .grid selector?
      - #title targets the id="title" .grid targets class="grid
  - In the following code, what is the difference between padding and margin?
      - Padding is the space between content and border
      - Margin is space outside border that seperates an element from others
  - Given this HTML and this CSS how will the images be displayed using flex?
      - Displayed according the flex properties. flex-direction, justify-content, align-items
  - What does the following padding CSS do?
      - Padding is the space between content and border. padding: 10px 20px; will apply 10px to top and bottom, and 20px to left and right. 
  - What does the following code using arrow syntax function declaration do?
      - () => {} is an anonymous function. Preserves the this context of its enclosing scope. 
  - What does the following code using map with an array output?
      - map iterates over each element in an array, applies a function to each, returns a new array with the transformed values
  - What does the following code output using getElementByID and addEventListener?
      - document.querySelector('#elementId') selects an element by its id, similar to getElementById
  - What does the following line of Javascript do using a # selector?
  - Which of the following are true? (mark all that are true about the DOM)
  - By default, the HTML span element has a default CSS display property value of:
      - inline
  - How would you use CSS to change all the div elements to have a background color of red?
      - div { background-color: red; }
  - How would you display an image with a hyperlink in HTML?
    ~~~
      - <a href="link"><img src="img"></a>
    ~~~
  - In the CSS box model, what is the ordering of the box layers starting at the inside and working out?
      - content -> padding -> border -> margin
  - Given the following HTML, what CSS would you use to set the text "trouble" to green and leave the "double" text unaffected?
      - wrap trouble in a span.
      - ~~~
        <span class="trouble">trouble</span>double
        .trouble {
          color: green;
        }
        ~~~
  - What will the following code output when executed using a for loop and console.log?
  - How would you use JavaScript to select an element with the id of “byu” and change the text color of that element to green?
      - ~~~
        document.getElementById('byu').style.color = 'green'; 
        ~~~
  - What is the opening HTML tag for a paragraph, ordered list, unordered list, second level heading, first level heading, third level heading?
    ~~~
      - Paragraph: <p>
      - Ordered list: <ol>
      - Unordered list: <ul>
      - Second-level heading: <h2>
      - First-level heading: <h1>
      - Third-level heading: <h3>
    ~~~
  - How do you declare the document type to be html?
    ~~~
      - <!DOCTYPE html>
    ~~~
  - What is valid javascript syntax for if, else, for, while, switch statements?
    ~~~
      if (condition) { ... }
      else { ... }

      for (let i = 0; i < n; i++) { ... }

      while (condition) { ... }

      switch (expression) {
        case value1:
          ...
        break;
      default:
      ...
    }
    ~~~
  - What is the correct syntax for creating a javascript object?
    ~~~
    const obj = {
    key1: 'value1',
    key2: 'value2'
    };
    ~~~
  - Is it possible to add new properties to javascript objects?
      - yes
  - If you want to include JavaScript on an HTML page, which tag do you use?
      - ~~~
        <script></script>
        ~~~
  - Given the following HTML, what JavaScript could you use to set the text "animal" to "crow" and leave the "fish" text unaffected?
    ~~~
    document.querySelector('.animal').textContent = 'crow';
    ~~~
  - Which of the following correctly describes JSON?
      - JSON (JavaScript Object Notation) is a lightweight data-interchange format that's easy for humans to read and write, and easy for machines to parse and generate.
  - What does the console command chmod, pwd, cd, ls, vim, nano, mkdir, mv, rm, man, ssh, ps, wget, sudo  do?
      - ~~~
          chmod: Changes file permissions.
          pwd: Prints the current working directory.
          cd: Changes the current directory.
          ls: Lists directory contents.
          vim/nano: Text editors.
          mkdir: Creates a directory.
          mv: Moves or renames files.
          rm: Removes files.
          man: Displays the manual for commands.
          ssh: Secure shell login to a remote machine.
          ps: Displays running processes.
          wget: Downloads files from the web.
          sudo: Runs commands with superuser privileges.
          ~~~
  - Which of the following console command creates a remote shell session?
      - ssh
  - Which of the following is true when the -la parameter is specified for the ls console command?
      - lists all files in long format
  - Which of the following is true for the domain name banana.fruit.bozo.click, which is the top level domain, which is a subdomain, which is a root domain?
      - top-level domain: .click
      - subdomina: banana
      - Root domain: bozo.click
  - Is a web certificate is necessary to use HTTPS.
      - yes
  - Can a DNS A record can point to an IP address or another A record.
      - The DNS record only points to an IP address
  - Port 443, 80, 22 is reserved for which protocol?
      - 443: https
      - 80: http
      - 22: ssh
  - What will the following code using Promises output when executed?


## React Basics 10/14/2024
Provide common components/encapsulation. Allows you to not repeat writing code. Like object-oriented webpage design. 

Load app once, have changes occur on the frontend. React is less restrictive and more flexible then Angular and Vue. 

Combining JavaScript and HTML, compile the html code. JSX code. Write code that looks like HTML, React compiles it behind the scenes. 

In CodePen, set preprocesser to Babel. 
```
    <div id="cs260">Before React </div>
    ReactDom.render(<p>Goodbye World</p>, document.querySelector("#cs260");
```
This code will find the id for cs260 and replace the inner html with the input to ReactDom.render()

### Components
Each Interactive part of your website can be created into pieces.

Never want a component thats more than a page of code. 

```
const Hello = () => {
  return <p> Hello world </p>;
};
const Goodbye = () => {
  return <p>Goodbye world <Hello />
</p>;
};

ReactDom.render(<Goodbye />, document.querySelector("#root"));
```

#### Component Class

```
class Hello extends React.Component {
  render() {
    return <p> Hello World </p>;
  }
}
```

#### Parameters
```
const Hello = ({ phrase }) => {
  const [color, setColor] = React.useState("red");

  function changeColor() {  
    setColor(color === "red" ? "green" : "red");
  }

  return (
    <div>
      <p style={{color :color}}> Hello {phrase}</p>
      <button onClick={changeColor}>change</button>
    </div>
  );
};
```

const[color, setColor]. color is a state variable, when you change it here, it will change anywhere else it is referenced.

## Web Services 11/1/2024

Startup service, next step is integrating APIs. This is creating the backend service. Things are really going to pick up the last few weeks. I should get as ahead as I can. 

### fetch
~~~
fetch(url)
.then(r => r.text())
.then(text => console.log(text))
~~~
Asynchronous call to api. Executes the callback on completion. 

Sends a request to the url, r is the response. 

Public API list, easy if no auth, https, and cors. 

Make an APP that uses chatGPT in someway, would be epic for a resume. 

### http protocols:
#### get
Retrieve a record
#### post
Add a record
#### put
Modify a record
#### delete
Delete a record

### Response codes
- 200 OK
