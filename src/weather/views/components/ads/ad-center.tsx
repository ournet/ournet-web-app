import * as React from "react";

export function AdCenter() {
  return (
    <div
      key={`ad-center-${Math.random().toString().substring(0, 10)}`}
      className="c-ad c-ad--wide"
    >
      <ins
        style={{ display: "block" }}
        data-ad-client="ca-pub-3959589883092051"
        data-ad-slot="3716415837"
        data-ad-format="auto"
        className="adsbygoogle"
      ></ins>
      {/* <script
        dangerouslySetInnerHTML={{
          __html: "(adsbygoogle = window.adsbygoogle || []).push({});"
        }}
      ></script> */}
    </div>
  );
}
