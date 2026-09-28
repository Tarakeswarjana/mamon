import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #FFF8F7 0%, #FFF0F1 55%, #D9C7E8 140%)",
        }}
      >
        <div
          style={{
            width: 340,
            height: 340,
            borderRadius: 90,
            background: "rgba(255,255,255,0.78)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 18px 60px rgba(201,106,121,0.18)",
            fontSize: 180,
          }}
        >
          ❤️
        </div>
      </div>
    ),
    size,
  );
}
