import { ImageResponse } from "next/og"

// Route segment config
export const runtime = "edge"

// Image metadata
export const alt = "Senior Product Designer Portfolio"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

// Image generation
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 48,
        background: "linear-gradient(to bottom, #1a1a1a, #333)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        padding: "40px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 40,
        }}
      >
        <img
          src="https://cezymahmqxazoloshntq.supabase.co/storage/v1/object/public/images//7jislqci8pr_1741721211664.png"
          width="120"
          height="120"
          alt=""
          style={{
            borderRadius: "50%",
            marginRight: 30,
          }}
        />
        <div style={{ fontSize: 64, fontWeight: "bold" }}>Senior Product Designer</div>
      </div>
      <div style={{ fontSize: 36, opacity: 0.9 }}>Portfolio 2025</div>
      <div style={{ fontSize: 24, marginTop: 20, opacity: 0.7 }}>
        Human-Centered Design • Biomedical Engineering • Product Strategy
      </div>
    </div>,
    {
      ...size,
    },
  )
}
