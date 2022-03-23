import { useState } from "react";
import useVirtual from "react-cool-virtual";

const loadData = async ({ loadIndex }, setData) => {
  // Set the state of a batch items as `true`
  // to avoid the callback from being invoked repeatedly
  isItemLoadedArr[loadIndex] = true;

  try {
    const { bundles: data } = await fetch(
      "https://api.opensea.io/api/v1/bundles?limit=2&offset=0"
    ).then((res) => res.json());

    setData((prevData) => [...prevData, ...data]);
  } catch (err) {
    console.error(err);
    loadData({ loadIndex }, setData);
  }
};

export default Explore = () => {
  const [data, setData] = useState([]);
  const { outerRef, innerRef, data } = useVirtual({
    loadMore: (e) => loadData(e, setData),
  });

  return (
    <div
      style={{ width: "300px", height: "500px", overflow: "auto" }}
      ref={outerRef}
    >
      <div ref={innerRef}>
        {data.map(({ index, measureRef }) => (
          <div
            key={data[index]?.id || `fb-${index}`}
            style={{ padding: "16px", minHeight: "122px" }}
            ref={measureRef} // Used to measure the unknown item size
          >
            {data[index]?.body || "⏳ Loading..."}
          </div>
        ))}
      </div>
    </div>
  );
};
