import React, { useState } from "react";
import { headingStyle, subheadingStyle } from "./components/styles";

const App = () => {
  // State for form inputs
  const [input, setInput] = useState({
    N: "",
    P: "",
    K: "",
    pH: "",
    EC: "",
    OC: "",
    S: "",
    Zn: "",
    Fe: "",
    Cu: "",
    Mn: "",
    B: "",
    soil_quality: "",
    moisture: "",
    temperature: "",
    actual_yield: "",
  });
  const [prediction, setPrediction] = useState(null);

  // Input categories for organized sections
  const inputCategories = {
    "Main Parameters": ["N", "P", "pH", "moisture"],
    "Additional Parameters": ["K", "EC", "OC", "S"],
    Micronutrients: ["Zn", "Fe", "Cu", "Mn", "B"],
    "Environmental Factors": ["soil_quality", "temperature °C", "actual_yield"],
  };

  const appStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #6366F1, #3B82F6, #22D3EE)",
    color: "#FFFFFF",
    fontFamily: "Poppins, sans-serif",
    padding: "20px",
    position: "relative",
    overflow: "hidden",
  };

  const cardStyle = {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    borderRadius: "16px",
    padding: "30px",
    width: "100%",
    maxWidth: "800px",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
    zIndex: 10,
    position: "relative",
  };

  const formStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "30px",
    width: "100%",
  };

  const inputGroupStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  };

  const inputStyle = {
    padding: "12px 15px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid transparent",
    background: "rgba(255, 255, 255, 0.9)",
    color: "#333",
    width: "100%",
    boxSizing: "border-box",
    transition: "border-color 0.3s, box-shadow 0.3s",
  };

  const buttonStyle = {
    padding: "15px 20px",
    fontSize: "18px",
    fontWeight: "bold",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#3B82F6",
    color: "#fff",
    cursor: "pointer",
    transition: "transform 0.3s ease, background-color 0.3s ease",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    width: "100%",
    marginTop: "20px",
  };

  const buttonHoverStyle = {
    backgroundColor: "#2563EB",
    transform: "translateY(-2px)",
  };

  const resultStyle = {
    marginTop: "25px",
    padding: "15px",
    borderRadius: "8px",
    background: "rgba(255, 255, 255, 0.15)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "1.5rem",
    fontWeight: "bold",
  };

  const shapeStyle = {
    position: "absolute",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.2)",
  };

  const detailsStyle = {
    marginBottom: "15px",
    borderRadius: "8px",
    background: "rgba(255, 255, 255, 0.15)",
    overflow: "hidden",
  };

  const summaryStyle = {
    padding: "15px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "1.1rem",
  };

  const detailsContentStyle = {
    padding: "15px",
    paddingTop: "0",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
  };

  const smallLabelStyle = {
    fontSize: "0.9rem",
    marginBottom: "3px",
    display: "block",
  };

  const smallInputStyle = {
    padding: "8px 12px",
    fontSize: "14px",
    borderRadius: "6px",
    background: "rgba(255, 255, 255, 0.9)",
    color: "#333",
    border: "none",
    width: "100%",
    boxSizing: "border-box",
  };

  // Handler functions
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Filter out empty values and convert to numbers
    const cleanedInput = {};
    Object.keys(input).forEach(key => {
      if (input[key] && input[key].trim() !== '') {
        cleanedInput[key] = parseFloat(input[key]) || 0;
      } else {
        cleanedInput[key] = 0; // Default value for empty fields
      }
    });
    
    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanedInput),
      });
      const data = await response.json();
      console.log(data, "work");
      setPrediction(data);
    } catch (error) {
      console.error("Error predicting soil fertility:", error);
      setPrediction("Error");
    }
  };

  const handleMouseEnter = (e) => {
    Object.assign(e.target.style, buttonHoverStyle);
  };

  const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = buttonStyle.backgroundColor;
    e.target.style.transform = "none";
  };

  // Label formatting
  const formatLabel = (key) => {
    const labels = {
      N: "Nitrogen(N) (mg/kg)",
      P: "Phosphorus(P) (mg/kg)",
      K: "Potassium(K) (mg/kg)",
      EC: "Electrical Conductivity(EC) (dS/m)",
      OC: "Organic Carbon(OC)(0-1 %)",
      S: "Sulfur(S) (mg/kg)",
      Zn: "Zinc(Zn) (mg/kg)",
      Fe: "Iron(Fe) (mg/kg)",
      Cu: "Copper(Cu) (mg/kg)",
      Mn: "Manganese(Mn) (mg/kg)",
      B: "Boron(B) (mg/kg)",
    };
    return labels[key] || key.replace("_", " ");
  };

  return (
    <div style={appStyle}>
      {/* Logo circle */}
      <div
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          border: "8px solid white",
          position: "absolute",
          top: "60px",
          left: "60px",
          zIndex: 5,
        }}
      ></div>

      {/* Decorative shapes */}
      <div
        style={{
          ...shapeStyle,
          width: "100px",
          height: "100px",
          top: "10%",
          left: "20%",
          animation: "move 20s linear infinite",
        }}
      ></div>
      <div
        style={{
          ...shapeStyle,
          width: "150px",
          height: "150px",
          top: "50%",
          left: "70%",
          animation: "move 15s linear infinite reverse",
        }}
      ></div>
      <div
        style={{
          ...shapeStyle,
          width: "80px",
          height: "80px",
          top: "30%",
          left: "40%",
          animation: "move 25s linear infinite",
        }}
      ></div>
      <div
        style={{
          ...shapeStyle,
          width: "120px",
          height: "120px",
          top: "70%",
          left: "10%",
          animation: "move 18s linear infinite reverse",
        }}
      ></div>

      {/* Decorative triangle */}
      <div
        style={{
          position: "absolute",
          width: "120px",
          height: "120px",
          backgroundColor: "#818CF8",
          borderRadius: "12px",
          transform: "rotate(45deg)",
          bottom: "60px",
          right: "60px",
          zIndex: 5,
        }}
      ></div>

      {/* Decorative circle */}
      <div
        style={{
          position: "absolute",
          width: "100px",
          height: "100px",
          backgroundColor: "#FB923C",
          borderRadius: "50%",
          top: "60px",
          right: "60px",
          zIndex: 5,
        }}
      ></div>

      <h1 style={headingStyle}>Soil Fertility Predictor</h1>
      <p style={subheadingStyle}>
        Enter soil parameters to predict its fertility
      </p>

      <div style={cardStyle}>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <div style={formStyle}>
            {Object.entries(inputCategories).map(([category, fields]) => (
              <div style={inputGroupStyle} key={category}>
                <details
                  style={detailsStyle}
                  open={category === "Main Parameters"}
                >
                  <summary style={summaryStyle}>{category}</summary>
                  <div style={detailsContentStyle}>
                    {fields.map((field) => (
                      <div key={field}>
                        <label style={smallLabelStyle}>
                          {formatLabel(field)}
                        </label>
                        <input
                          type="text"
                          name={field}
                          value={input[field]}
                          onChange={handleChange}
                          style={
                            category === "Main Parameters"
                              ? inputStyle
                              : smallInputStyle
                          }
                          placeholder={`Enter ${formatLabel(field)}`}
                        />
                      </div>
                    ))}
                  </div>
                </details>
              </div>
            ))}
          </div>

          <button
            type="submit"
            style={buttonStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Predict
          </button>
        </form>

        {prediction && (
          <div style={resultStyle}>
       {/*     <div>
              <span>
                <strong>Fertility Grade:</strong> {prediction.grade_fertility}
              </span>
            </div>*/}
            <div>
              <span>
                <strong>Recommended Fertilizer:</strong>{" "}
                {prediction.recommended_fertilizer}
              </span>
            </div>
            <div>
              <span>
                <strong>Predicted Yield:</strong> {prediction.predicted_yield}
              </span>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes move {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(20px); }
          100% { transform: translateY(0) translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default App;
