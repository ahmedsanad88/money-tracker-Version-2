// Function to handle the error when component doesn't load properly.

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div
      role="alert"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "90vw",
        margin: "2em auto",
        overflowX: "hidden",
        overflowY: "auto",
      }}
    >
      <div style={{ width: "100%" }}>
        <p style={{ fontWeight: "bold", color: "white" }}>
          Something went wrong:
        </p>
        <pre
          style={{
            fontWeight: "bold",
            color: "#FA8072",
            fontSize: "1.2rem",
            margin: "1.5rem 0",
            wordBreak: "break-all",
            width: "100%",
            whiteSpace: "pre-wrap",
          }}
        >
          {error.message}
        </pre>
        <button
          onClick={resetErrorBoundary}
          style={{
            padding: "0.5rem 1rem",
            outline: "none",
            border: "none",
            backgroundColor: "hsl(210, 100%, 49%)",
            color: "white",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export default ErrorFallback;
