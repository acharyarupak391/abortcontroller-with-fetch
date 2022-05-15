import { useRef, useState } from "preact/hooks";

export const FetchDelay = () => {
  const [loading, setLoading] = useState({
    quick: false,
    delay: false,
  });
  const [response, setResponse] = useState(null);
  const [abortControl, setAbortControl] = useState(null);

  const controller = useRef(new AbortController());

  const baseUrl = "https://62807e627532b4920f6fd0b1.mockapi.io/:endpoint";

  const url = (delay, endpoint) =>
    `https://deelay.me/${delay}/${baseUrl.replace(":endpoint", endpoint)}`;

  const fetchEndpoint = async (delay, endpoint) => {
    controller.current = new AbortController();
    try {
      const res = await fetch(url(delay, endpoint), {
        signal: controller.current.signal,
      });
      const body = await res.json();
      return body;
    } catch (err) {
      console.log({ err });
    }
  };

  const handleClick = async (type) => {
    setLoading((prev) => ({ ...prev, [type]: true }));
    if (abortControl) controller.current.abort();
    const res = await fetchEndpoint(type === "delay" ? 2000 : 0, type);
    setLoading((prev) => ({ ...prev, [type]: false }));
    setResponse({ data: res?.data });
  };

  return (
    <div
      style={{
        margin: "70px",
      }}
    >
      <div>
        <button onClick={() => handleClick("delay")}>
          <code>/delay</code>
        </button>
        <span
          style={{
            marginLeft: "5px",
          }}
        >
          {loading.delay && "Fetching..."}
        </span>
      </div>

      <br />
      <br />

      <div>
        <button onClick={() => handleClick("quick")}>
          <code>/quick</code>
        </button>
        <span
          style={{
            marginLeft: "5px",
          }}
        >
          {loading.quick && "Fetching..."}
        </span>
      </div>

      <div
        style={{
          marginTop: "50px",
          fontFamily: "sans-serif",
        }}
      >
        <span>Last Response:</span>
        <code
          style={{
            marginLeft: "10px",
          }}
        >
          {loading.delay || loading.quick
            ? "Fetching..."
            : response
            ? JSON.stringify(response)
            : ""}
        </code>
      </div>
      <br />
      <input
        type={"checkbox"}
        id="abort-checkbox"
        checked={abortControl}
        onChange={(e) => setAbortControl(e.target.checked)}
        style={{
          transform: "scale(1.10)",
        }}
      />
      <label
        htmlFor="abort-checkbox"
        style={{
          fontFamily: "sans-serif",
          fontSize: "14px",
          lineHeight: "20px",
        }}
      >
        Use AbortController()
      </label>

      {/* <br/>  
      <button
        onClick={() => {
          console.log("before:aborted: ", controller.current.signal.aborted);
          controller.current.abort();
          console.log("after:aborted: ", controller.current.signal.aborted);
        }}
      >
        abort
      </button> */}
    </div>
  );
};
