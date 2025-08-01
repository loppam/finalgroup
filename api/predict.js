export default async function handler(req, res) {
  console.log("API function called with method:", req.method);

  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    console.log("Handling OPTIONS request");
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    console.log("Method not allowed:", req.method);
    return res.status(405).json({ error: "Method not allowed" });
  }

  console.log("Processing POST request with body:", req.body);

  try {
    // Forward the request to your Flask backend
    console.log("Making request to Flask backend...");
    const flaskResponse = await fetch("http://143.244.161.196:3001/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    console.log("Flask response status:", flaskResponse.status);

    if (!flaskResponse.ok) {
      const errorText = await flaskResponse.text();
      console.error("Flask error response:", errorText);
      throw new Error(
        `Flask server responded with status: ${flaskResponse.status}`
      );
    }

    const data = await flaskResponse.json();
    console.log("Flask response data:", data);

    // Return the response from Flask backend
    res.status(200).json(data);
  } catch (error) {
    console.error("Error proxying to Flask backend:", error);
    res.status(500).json({
      error: "Failed to get prediction from backend",
      details: error.message,
    });
  }
}
