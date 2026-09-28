import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #FFF8F7 0%, #FFF0F1 60%, #EFA3AC 130%)",
          fontSize: 92,
        }}
      >
        ❤️
      </div>
    ),
    size,
  );
}
