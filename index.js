const { render } = require("preact");
const { FetchDelay } = require("./components/FetchDelay");

const App = () => {
  return (
    <main>
      <FetchDelay />
    </main>
  );
};

const rootElement = document.body;
render(<App />, rootElement);
